import React, { useEffect, useRef } from 'react';

/**
 * Helper hook to set up a crisp Retina-DPI canvas that automatically tracks
 * its parent section size via ResizeObserver + mouse position relative to the section.
 */
function useSectionCanvas(
  draw: (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number,
    mouse: { x: number; y: number; active: boolean }
  ) => void
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let width = parent.clientWidth || window.innerWidth;
    let height = parent.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const updateSize = () => {
      if (!canvas.parentElement) return;
      width = Math.max(1, canvas.parentElement.clientWidth);
      height = Math.max(1, canvas.parentElement.clientHeight);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateSize();

    const ro = new ResizeObserver(() => updateSize());
    ro.observe(parent);

    const mouse = {
      x: width * 0.5,
      y: height * 0.5,
      tx: width * 0.5,
      ty: height * 0.5,
      active: false,
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientY >= rect.top - 100 &&
        e.clientY <= rect.bottom + 100
      ) {
        mouse.tx = e.clientX - rect.left;
        mouse.ty = e.clientY - rect.top;
        mouse.active = true;
      } else {
        mouse.active = false;
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    let rafId: number;
    const startTime = performance.now();

    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      const elapsed = (now - startTime) * 0.001;

      // Buttery smooth mouse interpolation
      mouse.x += (mouse.tx - mouse.x) * 0.07;
      mouse.y += (mouse.ty - mouse.y) * 0.07;

      ctx.clearRect(0, 0, width, height);
      draw(ctx, width, height, elapsed, mouse);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [draw]);

  return canvasRef;
}

/**
 * 1. HERO SECTION BACKGROUND:
 * "3D Interactive Silk Ribbon Aurora & Starlight Bokeh"
 * Flowing 3D harmonic silk ribbons that ripple with the cursor + glowing starlight orbs.
 */
export const HeroLiquidWaveBg: React.FC = () => {
  const starsRef = useRef(
    Array.from({ length: 65 }, () => ({
      nx: Math.random(),
      ny: Math.random(),
      r: 0.8 + Math.random() * 2.2,
      speed: 0.015 + Math.random() * 0.035,
      phase: Math.random() * Math.PI * 2,
    }))
  );

  const canvasRef = useSectionCanvas((ctx, width, height, t, mouse) => {
    // 1. Ambient Cursor Spotlight Glow
    const spot = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, 520);
    spot.addColorStop(0, 'rgba(255, 255, 255, 0.11)');
    spot.addColorStop(0.45, 'rgba(161, 161, 170, 0.04)');
    spot.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = spot;
    ctx.fillRect(0, 0, width, height);

    // 2. Floating Starlight Bokeh Particles
    for (const s of starsRef.current) {
      const x = ((s.nx * width + t * 18 * s.speed * 20) % width);
      const y = ((s.ny * height - t * 14 * s.speed * 20 + height) % height);
      const pulse = 0.4 + 0.6 * Math.sin(t * 2.2 + s.phase);

      ctx.beginPath();
      ctx.arc(x, y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(244, 244, 245, ${0.22 * pulse})`;
      ctx.fill();
    }

    // 3. 28 Flowing 3D Silk Wave Ribbons
    const ribbonCount = 28;
    for (let i = 0; i < ribbonCount; i++) {
      const progress = i / (ribbonCount - 1);
      const yBase = height * 0.15 + progress * height * 0.75;

      ctx.beginPath();
      const step = 14;
      for (let x = 0; x <= width + step; x += step) {
        const dx = x - mouse.x;
        const dy = yBase - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseEffect = Math.max(0, 1 - dist / 360);

        const wave1 = Math.sin(x * 0.0035 + t * 1.1 + i * 0.22) * 34;
        const wave2 = Math.cos(x * 0.007 - t * 0.75 + i * 0.15) * 18;
        const mouseRipple = Math.sin(dist * 0.025 - t * 3.5) * mouseEffect * 42;

        const y = yBase + wave1 + wave2 + mouseRipple;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      const highlight = Math.sin(progress * Math.PI);
      const alpha = 0.06 + highlight * 0.16;
      ctx.strokeStyle = i % 4 === 0
        ? `rgba(255, 255, 255, ${alpha * 1.35})`
        : `rgba(161, 161, 170, ${alpha})`;
      ctx.lineWidth = i % 4 === 0 ? 1.4 : 0.9;
      ctx.stroke();
    }
  });

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
};

/**
 * 2. ABOUT SECTION BACKGROUND:
 * "Interactive Magnetic Neural Plexus & Traveling Synaptic Sparks"
 * Glowing nodes that form dynamic constellations, tether to the cursor, and fire live pulses along edges.
 */
export const AboutConstellationBg: React.FC = () => {
  const nodesRef = useRef(
    Array.from({ length: 68 }, () => ({
      nx: Math.random(),
      ny: Math.random(),
      vx: (Math.random() - 0.5) * 0.00045,
      vy: (Math.random() - 0.5) * 0.00045,
      r: 1.5 + Math.random() * 2,
      phase: Math.random() * Math.PI * 2,
    }))
  );

  const canvasRef = useSectionCanvas((ctx, width, height, t, mouse) => {
    const nodes = nodesRef.current;
    const pts = nodes.map((n) => {
      n.nx += n.vx;
      n.ny += n.vy;
      if (n.nx < 0.02 || n.nx > 0.98) n.vx *= -1;
      if (n.ny < 0.02 || n.ny > 0.98) n.vy *= -1;

      let x = n.nx * width;
      let y = n.ny * height;

      // Subtle magnetic pull toward cursor
      const dx = mouse.x - x;
      const dy = mouse.y - y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 260 && d > 1) {
        const pull = (1 - d / 260) * 18;
        x += (dx / d) * pull;
        y += (dy / d) * pull;
      }

      return { x, y, r: n.r, phase: n.phase };
    });

    // Draw constellation links + traveling pulse sparks
    const maxDist = 175;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < maxDist) {
          const proximity = 1 - d / maxDist;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(212, 212, 216, ${proximity * 0.26})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Traveling spark along every 7th active edge
          if ((i + j) % 7 === 0 && proximity > 0.35) {
            const p = (t * 0.65 + (i * 0.17)) % 1;
            const sx = a.x + (b.x - a.x) * p;
            const sy = a.y + (b.y - a.y) * p;
            ctx.beginPath();
            ctx.arc(sx, sy, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${proximity * 0.85})`;
            ctx.fill();
          }
        }
      }
    }

    // Draw glowing nodes
    for (const p of pts) {
      const glow = 0.55 + 0.45 * Math.sin(t * 2 + p.phase);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 2.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.07 * glow})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(244, 244, 245, ${0.55 * glow})`;
      ctx.fill();
    }
  });

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
};

/**
 * 3. SKILLS SECTION BACKGROUND:
 * "3D Planetary Astrolabe Gyroscope & Orbital Comet Trails"
 * Multi-axis rotating 3D rings with orbiting glowing satellites and rising light embers.
 */
export const SkillsGyroRingsBg: React.FC = () => {
  const embersRef = useRef(
    Array.from({ length: 55 }, () => ({
      nx: Math.random(),
      ny: Math.random(),
      speed: 0.03 + Math.random() * 0.06,
      len: 8 + Math.random() * 18,
      alpha: 0.15 + Math.random() * 0.35,
    }))
  );

  const canvasRef = useSectionCanvas((ctx, width, height, t, mouse) => {
    const cx = width * 0.5 + (mouse.x - width * 0.5) * 0.06;
    const cy = height * 0.48 + (mouse.y - height * 0.5) * 0.06;
    const baseRadius = Math.min(width, height) * 0.45;

    // Soft core radial aura
    const coreGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, baseRadius * 1.1);
    coreGlow.addColorStop(0, 'rgba(255, 255, 255, 0.07)');
    coreGlow.addColorStop(0.5, 'rgba(161, 161, 170, 0.025)');
    coreGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = coreGlow;
    ctx.fillRect(0, 0, width, height);

    // 6 Concentric 3D Gyroscopic Orbital Rings + Orbiting Comets
    for (let r = 1; r <= 6; r++) {
      const rx = (baseRadius / 6) * r * 1.15;
      const tiltRatio = 0.28 + 0.18 * Math.sin(t * 0.45 + r * 0.9);
      const ry = rx * tiltRatio;
      const rot = t * (r % 2 === 0 ? 0.32 : -0.26) + r * 0.55;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);

      // Ring ellipse
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle =
        r % 2 === 0
          ? 'rgba(244, 244, 245, 0.16)'
          : 'rgba(161, 161, 170, 0.11)';
      ctx.lineWidth = r % 2 === 0 ? 1.3 : 1;
      if (r % 3 === 0) ctx.setLineDash([6, 10]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Orbiting glowing satellite on this ring
      const satAngle = t * (1.1 + r * 0.15) * (r % 2 === 0 ? 1 : -1);
      const sx = Math.cos(satAngle) * rx;
      const sy = Math.sin(satAngle) * ry;

      const satGlow = ctx.createRadialGradient(sx, sy, 0.5, sx, sy, 14);
      satGlow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      satGlow.addColorStop(0.4, 'rgba(228, 228, 231, 0.35)');
      satGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = satGlow;
      ctx.beginPath();
      ctx.arc(sx, sy, 14, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // Rising vertical light embers
    for (const e of embersRef.current) {
      const x = e.nx * width;
      const y = ((e.ny * height - t * e.speed * height * 2) % height + height) % height;

      const grad = ctx.createLinearGradient(x, y, x, y + e.len);
      grad.addColorStop(0, `rgba(255, 255, 255, ${e.alpha})`);
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + e.len);
      ctx.stroke();
    }
  });

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
};

/**
 * 4. PROJECTS SECTION BACKGROUND:
 * "3D Perspective Vanishing-Point Horizon Grid & Racing Photon Lasers"
 * A true 3D perspective floor & ceiling corridor with high-speed light pulses.
 */
export const ProjectsHorizonGridBg: React.FC = () => {
  const canvasRef = useSectionCanvas((ctx, width, height, t, mouse) => {
    const vx = width * 0.5 + (mouse.x - width * 0.5) * 0.12;
    const vy = height * 0.22;

    // Horizon glow
    const hGlow = ctx.createRadialGradient(vx, vy, 10, vx, vy, width * 0.65);
    hGlow.addColorStop(0, 'rgba(255, 255, 255, 0.09)');
    hGlow.addColorStop(0.4, 'rgba(161, 161, 170, 0.03)');
    hGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = hGlow;
    ctx.fillRect(0, 0, width, height);

    // Radial perspective rays from vanishing point to bottom & sides
    const numRays = 26;
    ctx.lineWidth = 1;
    for (let i = -numRays; i <= numRays; i++) {
      const targetX = vx + (i / numRays) * width * 1.6;
      const targetY = height;
      ctx.beginPath();
      ctx.moveTo(vx, vy);
      ctx.lineTo(targetX, targetY);
      ctx.strokeStyle = 'rgba(228, 228, 231, 0.08)';
      ctx.stroke();

      // Photon pulse racing down selected perspective rays
      if (Math.abs(i) % 3 === 1) {
        const p = ((t * 0.55 + Math.abs(i) * 0.21) % 1);
        const p2 = Math.min(1, p + 0.12);
        const x1 = vx + (targetX - vx) * (p * p);
        const y1 = vy + (targetY - vy) * (p * p);
        const x2 = vx + (targetX - vx) * (p2 * p2);
        const y2 = vy + (targetY - vy) * (p2 * p2);

        const lGrad = ctx.createLinearGradient(x1, y1, x2, y2);
        lGrad.addColorStop(0, 'rgba(255,255,255,0)');
        lGrad.addColorStop(1, 'rgba(255,255,255,0.55)');
        ctx.strokeStyle = lGrad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }

    // Scrolling perspective horizontal depth lines
    const depthLines = 20;
    const scrollPhase = (t * 0.45) % 1;
    for (let d = 0; d < depthLines; d++) {
      const norm = (d + scrollPhase) / depthLines;
      const curved = norm * norm; // Exponential perspective spacing
      const y = vy + curved * (height - vy);
      const alpha = curved * 0.16;

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.strokeStyle = `rgba(244, 244, 245, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  });

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
};

/**
 * 5. AGENTIC AI SECTION BACKGROUND:
 * "Flowing Neural Fiber-Optic Streams & High-Speed Comet Packets"
 * Multi-strand S-curve neural pathways with glowing long-tailed data comets.
 */
export const AgenticSynapseBg: React.FC = () => {
  const canvasRef = useSectionCanvas((ctx, width, height, t, mouse) => {
    const streams = 11;

    for (let s = 0; s < streams; s++) {
      const yBase = (height / (streams + 1)) * (s + 1);

      const getY = (x: number) => {
        const dx = x - mouse.x;
        const dy = yBase - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pull = Math.max(0, 1 - dist / 300);

        return (
          yBase +
          Math.sin(x * 0.0035 + s * 0.9 + t * 0.9) * 48 +
          Math.cos(x * 0.006 - s * 0.6 + t * 0.6) * 22 +
          pull * 30 * Math.sin(t * 3)
        );
      };

      // Base fiber-optic curve
      ctx.beginPath();
      for (let x = 0; x <= width; x += 14) {
        const y = getY(x);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(212, 212, 216, 0.11)';
      ctx.lineWidth = 1.1;
      ctx.stroke();

      // Glowing Comet Packet with Long Trail
      const speed = 180 + (s % 4) * 45;
      const headX = ((t * speed + s * 210) % (width + 240)) - 120;
      const tailLen = 110;

      ctx.beginPath();
      for (let tx = Math.max(0, headX - tailLen); tx <= Math.min(width, headX); tx += 8) {
        const ty = getY(tx);
        if (tx === Math.max(0, headX - tailLen)) ctx.moveTo(tx, ty);
        else ctx.lineTo(tx, ty);
      }
      const tailGrad = ctx.createLinearGradient(headX - tailLen, 0, headX, 0);
      tailGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      tailGrad.addColorStop(1, 'rgba(255, 255, 255, 0.75)');
      ctx.strokeStyle = tailGrad;
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Comet head glow
      if (headX >= 0 && headX <= width) {
        const headY = getY(headX);
        const glow = ctx.createRadialGradient(headX, headY, 1, headX, headY, 18);
        glow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        glow.addColorStop(0.4, 'rgba(228, 228, 231, 0.35)');
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(headX, headY, 18, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  });

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
};

/**
 * 6. EXPERIENCE SECTION BACKGROUND:
 * "Volumetric Dark-Silver Aurora Borealis Curtains & Drifting Depth Bokeh"
 * Silky undulating aurora curtains + soft floating light orbs.
 */
export const ExperienceAuroraPillarsBg: React.FC = () => {
  const orbsRef = useRef(
    Array.from({ length: 38 }, () => ({
      nx: Math.random(),
      ny: Math.random(),
      r: 8 + Math.random() * 28,
      speed: 0.01 + Math.random() * 0.025,
      phase: Math.random() * Math.PI * 2,
    }))
  );

  const canvasRef = useSectionCanvas((ctx, width, height, t) => {
    // 1. Volumetric Aurora Borealis Curtains
    const curtains = 6;
    for (let c = 0; c < curtains; c++) {
      const baseX = width * (0.1 + c * 0.16) + Math.sin(t * 0.55 + c * 1.2) * 110;
      const bandWidth = 170 + Math.cos(t * 0.4 + c) * 45;

      const grad = ctx.createLinearGradient(baseX - bandWidth, 0, baseX + bandWidth, height);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(0.35, `rgba(228, 228, 231, ${0.045 + (c % 2) * 0.025})`);
      grad.addColorStop(0.65, `rgba(161, 161, 170, ${0.035 + (c % 3) * 0.02})`);
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(baseX - bandWidth, 0);
      ctx.bezierCurveTo(
        baseX + Math.sin(t + c) * 90,
        height * 0.33,
        baseX - Math.cos(t * 0.8 + c) * 90,
        height * 0.66,
        baseX + bandWidth * 0.5,
        height
      );
      ctx.lineTo(baseX - bandWidth * 1.2, height);
      ctx.closePath();
      ctx.fill();
    }

    // 2. Soft Floating Depth-of-Field Bokeh Orbs
    for (const o of orbsRef.current) {
      const x = o.nx * width + Math.sin(t * 0.7 + o.phase) * 35;
      const y = ((o.ny * height - t * o.speed * height + height) % height);

      const g = ctx.createRadialGradient(x, y, 1, x, y, o.r);
      g.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
      g.addColorStop(0.5, 'rgba(212, 212, 216, 0.04)');
      g.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, o.r, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
};

/**
 * 7. SERVICES SECTION BACKGROUND:
 * "3D Interactive Gravity Wave Dot Carpet (Linear / Raycast 2.5D Topography)"
 * A responsive dot matrix that undulates in 3D waves and elevates around the cursor.
 */
export const ServicesDotMatrixBg: React.FC = () => {
  const canvasRef = useSectionCanvas((ctx, width, height, t, mouse) => {
    const spacing = 36;
    const cols = Math.ceil(width / spacing);
    const rows = Math.ceil(height / spacing);

    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        const bx = c * spacing;
        const by = r * spacing;

        const dx = bx - mouse.x;
        const dy = by - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseBoost = Math.max(0, 1 - dist / 280);

        const wave =
          Math.sin(c * 0.28 + t * 1.8) * Math.cos(r * 0.28 - t * 1.4) * 0.5 + 0.5;

        const yOffset =
          Math.sin(c * 0.3 + r * 0.25 - t * 2.2) * 8 - mouseBoost * 18;

        const radius = 1.0 + wave * 1.5 + mouseBoost * 2.4;
        const alpha = 0.08 + wave * 0.22 + mouseBoost * 0.5;

        ctx.beginPath();
        ctx.arc(bx, by + yOffset, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 244, 245, ${Math.min(0.9, alpha)})`;
        ctx.fill();
      }
    }
  });

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
};

/**
 * 8. CONTACT SECTION BACKGROUND:
 * "Interactive Hydro-Acoustic Interference Ripples & Shooting Meteors"
 * Dual harmonic ripple emitters + cursor ripple + sleek shooting star streaks.
 */
export const ContactRippleBg: React.FC = () => {
  const canvasRef = useSectionCanvas((ctx, width, height, t, mouse) => {
    const centers = [
      { x: width * 0.28, y: height * 0.45 },
      { x: width * 0.72, y: height * 0.55 },
      { x: mouse.x, y: mouse.y },
    ];

    const maxR = Math.max(width, height) * 0.55;

    centers.forEach((center, cIdx) => {
      const count = cIdx === 2 ? 5 : 8;
      for (let i = 0; i < count; i++) {
        const r = ((t * 55 + (i * maxR) / count + cIdx * 70) % maxR);
        const progress = r / maxR;
        const alpha = (1 - progress) * (cIdx === 2 ? 0.22 : 0.16);

        ctx.beginPath();
        ctx.arc(center.x, center.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(244, 244, 245, ${alpha})`;
        ctx.lineWidth = cIdx === 2 ? 1.5 : 1.1;
        ctx.stroke();
      }
    });

    // Occasional sleek diagonal shooting stars
    for (let m = 0; m < 4; m++) {
      const cycle = (t * 0.35 + m * 0.27) % 1;
      if (cycle < 0.35) {
        const p = cycle / 0.35;
        const sx = width * (0.15 + m * 0.22) + p * 260;
        const sy = height * 0.1 + p * 180;
        const len = 85;

        const mGrad = ctx.createLinearGradient(sx - len, sy - len * 0.7, sx, sy);
        mGrad.addColorStop(0, 'rgba(255,255,255,0)');
        mGrad.addColorStop(1, `rgba(255,255,255,${(1 - p) * 0.75})`);
        ctx.strokeStyle = mGrad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(sx - len, sy - len * 0.7);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
    }
  });

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
};
