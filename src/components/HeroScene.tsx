import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export type SculptureMode = 'astrolabe' | 'lattice' | 'orbital';

interface HeroSceneProps {
  mode?: SculptureMode;
}

/** Generate a soft circular bokeh glow sprite so particles never look like square pixels */
function createBokehTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 248, 220, 1)');
  gradient.addColorStop(0.25, 'rgba(241, 223, 166, 0.85)');
  gradient.addColorStop(0.55, 'rgba(212, 175, 55, 0.35)');
  gradient.addColorStop(1, 'rgba(8, 8, 8, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ mode = 'astrolabe' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const modeRef = useRef<SculptureMode>(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      const testCanvas = document.createElement('canvas');
      const gl =
        testCanvas.getContext('webgl2') ||
        testCanvas.getContext('webgl') ||
        testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#080808', 0.065);

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / Math.max(1, container.clientHeight),
      0.1,
      100
    );
    camera.position.set(0, 1.4, 8.5);

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    const bokehTexture = createBokehTexture();

    // 1. Flowing Liquid-Gold Silk Wave Mesh (Organic undulating 3D wave terrain)
    const waveCols = isMobile ? 75 : 130;
    const waveRows = isMobile ? 45 : 75;
    const waveGeo = new THREE.PlaneGeometry(22, 12, waveCols, waveRows);
    waveGeo.rotateX(-Math.PI * 0.42);

    // Store initial vertex positions for smooth harmonic wave displacement
    const posAttr = waveGeo.attributes.position as THREE.BufferAttribute;
    const basePositions = new Float32Array(posAttr.array.length);
    basePositions.set(posAttr.array);

    const wavePointsMat = new THREE.PointsMaterial({
      map: bokehTexture,
      color: new THREE.Color('#D4AF37'),
      size: isMobile ? 0.12 : 0.1,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const silkWavePoints = new THREE.Points(waveGeo, wavePointsMat);
    silkWavePoints.position.set(0, -1.35, -1.2);
    worldGroup.add(silkWavePoints);

    // Secondary soft champagne silk veil for depth
    const veilGeo = new THREE.PlaneGeometry(20, 10, Math.floor(waveCols * 0.6), Math.floor(waveRows * 0.6));
    veilGeo.rotateX(-Math.PI * 0.36);
    const veilPosAttr = veilGeo.attributes.position as THREE.BufferAttribute;
    const veilBasePositions = new Float32Array(veilPosAttr.array.length);
    veilBasePositions.set(veilPosAttr.array);

    const veilMat = new THREE.PointsMaterial({
      map: bokehTexture,
      color: new THREE.Color('#F1DFA6'),
      size: 0.14,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const champagneVeil = new THREE.Points(veilGeo, veilMat);
    champagneVeil.position.set(0, 0.35, -2.5);
    worldGroup.add(champagneVeil);

    // 2. Ambient 3D Bokeh Starfield (Floating Luminous Gold Orbs in 3D Depth)
    const starCount = isMobile ? 160 : 380;
    const starPositions = new Float32Array(starCount * 3);
    const starSpeeds = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 20;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;
      starSpeeds[i] = 0.2 + Math.random() * 0.8;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      map: bokehTexture,
      color: new THREE.Color('#F1DFA6'),
      size: 0.18,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeo, starMat);
    worldGroup.add(starField);

    // 3. Sweeping 3D Luminous Gold Light Streams (Smooth Bezier Ribbons)
    const streamGroup = new THREE.Group();
    worldGroup.add(streamGroup);

    const streamCurves: THREE.CatmullRomCurve3[] = [];
    const streamOrbs: THREE.Mesh[] = [];

    for (let s = 0; s < 4; s++) {
      const yOffset = (s - 1.5) * 1.1;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-10, yOffset - 0.8, -3),
        new THREE.Vector3(-4, yOffset + 1.2, -1),
        new THREE.Vector3(2, yOffset - 0.9, 0.5),
        new THREE.Vector3(7, yOffset + 1.1, -1.5),
        new THREE.Vector3(11, yOffset - 0.4, -3.5),
      ]);
      streamCurves.push(curve);

      const points = curve.getPoints(90);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(s % 2 === 0 ? '#D4AF37' : '#F1DFA6'),
        transparent: true,
        opacity: 0.24,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      streamGroup.add(line);

      // Glowing energy orb traveling smoothly along each 3D curve
      const orbGeo = new THREE.SphereGeometry(0.07, 16, 16);
      const orbMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#FFF3C4'),
      });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      streamGroup.add(orb);
      streamOrbs.push(orb);
    }

    // Pointer & Scroll state for fluid 3D camera parallax
    let pointerX = 0;
    let pointerY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let isVisible = true;

    const onPointerMove = (e: PointerEvent) => {
      pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      pointerY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.02 }
    );
    observer.observe(container);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = Math.max(1, container.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let rafId: number;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      const activeMode = modeRef.current;
      const speedMult = activeMode === 'orbital' ? 1.35 : activeMode === 'lattice' ? 0.9 : 1.1;

      smoothX += (pointerX - smoothX) * 0.04;
      smoothY += (pointerY - smoothY) * 0.04;

      // Smooth 3D camera drift responding to cursor
      camera.position.x = smoothX * 1.35;
      camera.position.y = 1.4 + smoothY * 0.75;
      camera.lookAt(0, 0, -1);

      if (!prefersReducedMotion) {
        // Animate primary liquid gold silk wave vertices
        const arr = posAttr.array as Float32Array;
        for (let i = 0; i < arr.length; i += 3) {
          const bx = basePositions[i];
          const by = basePositions[i + 1];
          const bz = basePositions[i + 2];

          const wave1 = Math.sin(bx * 0.45 + elapsed * 1.1 * speedMult + smoothX * 2.0) * 0.55;
          const wave2 = Math.cos(bz * 0.55 + elapsed * 0.85 * speedMult + smoothY * 2.0) * 0.45;
          const ripple = Math.sin(Math.sqrt(bx * bx + bz * bz) * 0.6 - elapsed * 1.4) * 0.25;

          arr[i + 1] = by + wave1 + wave2 + ripple;
        }
        posAttr.needsUpdate = true;

        // Animate secondary champagne veil
        const vArr = veilPosAttr.array as Float32Array;
        for (let i = 0; i < vArr.length; i += 3) {
          const bx = veilBasePositions[i];
          const by = veilBasePositions[i + 1];
          const bz = veilBasePositions[i + 2];
          vArr[i + 1] =
            by +
            Math.cos(bx * 0.35 - elapsed * 0.75) * 0.6 +
            Math.sin(bz * 0.45 + elapsed * 0.65) * 0.4;
        }
        veilPosAttr.needsUpdate = true;

        // Gently float bokeh stars upward & swirl
        const sArr = starGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < starCount; i++) {
          sArr[i * 3 + 1] += 0.004 * starSpeeds[i];
          if (sArr[i * 3 + 1] > 6) sArr[i * 3 + 1] = -6;
        }
        starGeo.attributes.position.needsUpdate = true;
        starField.rotation.y = elapsed * 0.025 + smoothX * 0.15;

        // Move luminous energy pulses along 3D bezier curves
        streamOrbs.forEach((orb, idx) => {
          const t = (elapsed * 0.18 * speedMult + idx * 0.25) % 1;
          const pt = streamCurves[idx].getPointAt(t);
          orb.position.copy(pt);
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      renderer.dispose();
      bokehTexture.dispose();
      waveGeo.dispose();
      veilGeo.dispose();
      starGeo.dispose();
    };
  }, []);

  if (!webglSupported) {
    return (
      <div
        className="pointer-events-none absolute inset-0 bg-gold-ambient"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
      aria-hidden="true"
    />
  );
};
