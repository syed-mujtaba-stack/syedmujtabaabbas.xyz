"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

export default function MotionScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.devicePixelRatio < 2,
        powerPreference: "low-power",
      });
    } catch (error) {
      container.dataset.sceneFallback = "true";
      console.warn("Three.js is unavailable; using the static hero artwork.", error);
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const mobile = window.matchMedia("(max-width: 680px)").matches;
    const lowPower = mobile || (navigator.hardwareConcurrency || 8) <= 4;
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, lowPower ? 1 : 1.5),
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.z = 6.2;

    const centerpiece = new THREE.Group();
    scene.add(centerpiece);
    scene.add(new THREE.AmbientLight(0xf6e9d7, 1.6));

    const keyLight = new THREE.PointLight(0xf1c993, 32, 12);
    keyLight.position.set(-2.8, 2.8, 4);
    scene.add(keyLight);

    const coolLight = new THREE.PointLight(0x7898ac, 13, 10);
    coolLight.position.set(3, -1.4, 2);
    scene.add(coolLight);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.12, lowPower ? 3 : 5),
      new THREE.MeshPhysicalMaterial({
        color: 0x92775c,
        metalness: 0.76,
        roughness: 0.23,
        clearcoat: 0.7,
        clearcoatRoughness: 0.22,
        flatShading: true,
      }),
    );
    centerpiece.add(core);

    const wireframe = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.16, 2),
      new THREE.MeshBasicMaterial({
        color: 0xe9d3b4,
        wireframe: true,
        transparent: true,
        opacity: 0.14,
      }),
    );
    centerpiece.add(wireframe);

    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(1.48, 0.008, 8, lowPower ? 90 : 180),
      new THREE.MeshBasicMaterial({
        color: 0xe5c398,
        transparent: true,
        opacity: 0.52,
      }),
    );
    orbit.rotation.set(0.82, -0.42, 0.24);
    centerpiece.add(orbit);

    const orbitTwo = new THREE.Mesh(
      new THREE.TorusGeometry(1.74, 0.005, 6, lowPower ? 90 : 180),
      new THREE.MeshBasicMaterial({
        color: 0x9aafbd,
        transparent: true,
        opacity: 0.24,
      }),
    );
    orbitTwo.rotation.set(-0.62, 0.7, -0.3);
    centerpiece.add(orbitTwo);

    const particleCount = lowPower ? 36 : 150;
    const positions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 1.9 + Math.random() * 1.05;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[index * 3 + 2] = radius * Math.cos(phi);
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    centerpiece.add(
      new THREE.Points(
        particleGeometry,
        new THREE.PointsMaterial({
          color: 0xe4c49e,
          size: lowPower ? 0.023 : 0.018,
          transparent: true,
          opacity: 0.66,
          sizeAttenuation: true,
        }),
      ),
    );

    const animation = reducedMotion
      ? []
      : [
          gsap.to(centerpiece.rotation, {
            y: Math.PI * 2,
            x: 0.16,
            duration: 34,
            repeat: -1,
            ease: "none",
            paused: true,
          }),
          gsap.to(orbit.rotation, {
            z: orbit.rotation.z + Math.PI * 2,
            duration: 56,
            repeat: -1,
            ease: "none",
            paused: true,
          }),
          gsap.to(core.position, {
            y: 0.09,
            duration: 3.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            paused: true,
          }),
        ];

    let frameId = 0;
    let isInViewport = false;
    let isPageVisible = document.visibilityState === "visible";

    const render = () => {
      renderer.render(scene, camera);
      if (isInViewport && isPageVisible && !reducedMotion) {
        frameId = window.requestAnimationFrame(render);
      } else {
        frameId = 0;
      }
    };

    const updateScene = () => {
      const shouldAnimate = isInViewport && isPageVisible && !reducedMotion;
      animation.forEach((tween) => {
        if (shouldAnimate) tween.play();
        else tween.pause();
      });

      if (shouldAnimate && frameId === 0) {
        frameId = window.requestAnimationFrame(render);
      } else if (!shouldAnimate && frameId !== 0) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
        renderer.render(scene, camera);
      }
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isInViewport = entry.isIntersecting;
      updateScene();
    });
    intersectionObserver.observe(container);

    const onVisibilityChange = () => {
      isPageVisible = document.visibilityState === "visible";
      updateScene();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const resizeObserver = new ResizeObserver(() => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.render(scene, camera);
    });
    resizeObserver.observe(container);

    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width > 0 && height > 0) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    renderer.render(scene, camera);

    return () => {
      if (frameId !== 0) window.cancelAnimationFrame(frameId);
      animation.forEach((tween) => tween.kill());
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="motion-scene" ref={containerRef} aria-hidden="true" />;
}
