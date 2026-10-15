import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const PARTICLE_VERTEX_SHADER = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  uniform float uScrollVelocity;
  uniform float uPixelRatio;

  attribute float aScale;
  attribute float aPhase;
  attribute vec3 aRandom;

  varying float vAlpha;
  varying float vGoldMix;

  void main() {
    vec3 pos = position;

    // Organic 3D vortex & wave flow on GPU
    float t = uTime * 0.45 + aPhase;
    float radius = length(pos.xz);
    float angle = atan(pos.z, pos.x) + sin(t * 0.6 + radius * 0.25) * 0.35;

    pos.x = cos(angle) * radius + sin(t + pos.y * 0.5) * 0.45;
    pos.z = sin(angle) * radius + cos(t + pos.x * 0.4) * 0.45;
    pos.y += sin(uTime * 0.7 + pos.x * 0.45 + pos.z * 0.35) * 0.65;

    // Scroll fly-through & hyperspace warp stretch
    float scrollOffset = mod(pos.z + uScroll * 8.0 + 12.0, 24.0) - 12.0;
    pos.z = scrollOffset;
    pos.y += sin(uScroll * 3.14159) * 0.5;

    // Interactive Cursor Gravity / Repulsion Ripple in 3D
    vec2 mouseWorld = uMouse * vec2(8.0, 5.0);
    float distToMouse = distance(pos.xy, mouseWorld);
    float mouseInfluence = smoothstep(3.8, 0.0, distToMouse);
    vec2 dir = normalize(pos.xy - mouseWorld + vec2(0.0001));
    pos.xy += dir * mouseInfluence * 1.15;
    pos.z += mouseInfluence * 1.4;

    // Velocity warp stretch
    pos.z += aRandom.z * uScrollVelocity * 2.2;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation with depth & mouse boost
    float baseSize = (18.0 * aScale + mouseInfluence * 22.0) * uPixelRatio;
    gl_PointSize = clamp(baseSize * (1.0 / -mvPosition.z), 1.5, 42.0);

    // Smooth depth fade at far and near planes
    float depthFade = smoothstep(-14.0, -3.0, mvPosition.z) * (1.0 - smoothstep(-1.8, -0.2, mvPosition.z));
    vAlpha = depthFade * (0.45 + mouseInfluence * 0.55);
    vGoldMix = fract(aPhase * 1.7 + mouseInfluence * 0.5);
  }
`;

const PARTICLE_FRAGMENT_SHADER = `
  varying float vAlpha;
  varying float vGoldMix;

  void main() {
    // Soft radial bokeh glow (zero hard square edges!)
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    if (d > 0.5) discard;

    float core = smoothstep(0.5, 0.0, d);
    float glow = pow(core, 2.2);

    vec3 goldPrimary = vec3(0.831, 0.686, 0.216);   // #D4AF37
    vec3 goldChampagne = vec3(0.945, 0.875, 0.651); // #F1DFA6
    vec3 hotCore = vec3(1.0, 0.98, 0.90);

    vec3 baseColor = mix(goldPrimary, goldChampagne, vGoldMix);
    vec3 finalColor = mix(baseColor, hotCore, smoothstep(0.22, 0.0, d));

    gl_FragColor = vec4(finalColor, glow * vAlpha);
  }
`;

export const WorldClassWebGLCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setSupported(false);
        return;
      }
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setSupported(false);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2);

    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / Math.max(1, window.innerHeight),
      0.1,
      50
    );
    camera.position.set(0, 0, 7.5);

    // 1. GPU Shader Particle Singularity Field (4,500 particles on desktop)
    const count = isMobile ? 1800 : 4800;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);
    const randoms = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spiral galaxy distribution
      const arm = i % 3;
      const r = Math.pow(Math.random(), 0.75) * 12.5;
      const spinAngle = r * 0.65 + (arm * Math.PI * 2) / 3 + (Math.random() - 0.5) * 0.8;

      positions[i * 3] = Math.cos(spinAngle) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 22.0 - 2.0;

      scales[i] = 0.4 + Math.random() * 1.8;
      phases[i] = Math.random() * Math.PI * 2;

      randoms[i * 3] = Math.random() - 0.5;
      randoms[i * 3 + 1] = Math.random() - 0.5;
      randoms[i * 3 + 2] = Math.random() - 0.5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uScrollVelocity: { value: 0 },
      uPixelRatio: { value: pixelRatio },
    };

    const shaderMat = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERTEX_SHADER,
      fragmentShader: PARTICLE_FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particleField = new THREE.Points(geo, shaderMat);
    scene.add(particleField);

    // 2. Flowing 3D Gold Energy Filaments (Curved Light Streams)
    const filamentGroup = new THREE.Group();
    scene.add(filamentGroup);
    const filamentLines: THREE.Line[] = [];

    for (let f = 0; f < 5; f++) {
      const curvePts: THREE.Vector3[] = [];
      const yBase = (f - 2) * 1.3;
      for (let p = 0; p <= 60; p++) {
        const ratio = p / 60;
        const x = (ratio - 0.5) * 22;
        const y = yBase + Math.sin(ratio * Math.PI * 3 + f) * 1.2;
        const z = -2.5 + Math.cos(ratio * Math.PI * 2 + f) * 2.0;
        curvePts.push(new THREE.Vector3(x, y, z));
      }
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePts);
      const curveMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(f % 2 === 0 ? '#D4AF37' : '#F1DFA6'),
        transparent: true,
        opacity: 0.14,
      });
      const line = new THREE.Line(curveGeo, curveMat);
      filamentGroup.add(line);
      filamentLines.push(line);
    }

    // Track pointer & scroll velocity
    const targetMouse = new THREE.Vector2(0, 0);
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let targetScrollNorm = 0;

    const handlePointerMove = (e: PointerEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      lastScrollY = currentY;
      scrollVelocity = Math.max(-1.5, Math.min(1.5, delta * 0.015));
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetScrollNorm = currentY / maxScroll;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / Math.max(1, window.innerHeight);
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let rafId: number;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        uniforms.uTime.value = elapsed;
      }

      // Smooth mouse & scroll interpolation
      uniforms.uMouse.value.lerp(targetMouse, 0.06);
      uniforms.uScroll.value += (targetScrollNorm - uniforms.uScroll.value) * 0.06;
      scrollVelocity *= 0.92;
      uniforms.uScrollVelocity.value += (scrollVelocity - uniforms.uScrollVelocity.value) * 0.12;

      // Subtle camera banking with mouse & scroll
      camera.position.x = uniforms.uMouse.value.x * 0.65;
      camera.position.y = uniforms.uMouse.value.y * 0.45;
      camera.rotation.z = -uniforms.uMouse.value.x * 0.03 + uniforms.uScrollVelocity.value * 0.04;

      filamentGroup.rotation.y = Math.sin(elapsed * 0.15) * 0.12 + uniforms.uMouse.value.x * 0.1;
      filamentGroup.rotation.x = uniforms.uMouse.value.y * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geo.dispose();
      shaderMat.dispose();
      filamentLines.forEach((l) => l.geometry.dispose());
    };
  }, []);

  if (!supported) {
    return <div className="pointer-events-none fixed inset-0 z-0 bg-gold-ambient" aria-hidden="true" />;
  }

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
