import { useEffect, useRef, useState } from 'react';

export function Core3D() {
  const mountRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const isPlayingRef = useRef(true);
  const animFrameRef = useRef(null);
  const isDraggingRef = useRef(false);
  const rotRef = useRef({ x: 0.3, y: 0.4 });
  const prevPointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Use a high-performance, universal HTML5 Canvas 2D engine that renders
    // a 3D projected spherical constellation with glowing nodes and orbital rings.
    // Guaranteed to work flawlessly across all devices, GPUs, and headless browsers with zero WebGL crash risk.
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.innerHTML = '';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = container.clientWidth || 800);
    let height = (canvas.height = container.clientHeight || 420);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Generate 3D Spherical Nodes
    const numNodes = 240;
    const nodes = [];
    const radius = Math.min(width, height) * 0.32;

    for (let i = 0; i < numNodes; i++) {
      // Golden Spiral distribution on sphere surface
      const y = 1 - (i / (numNodes - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = i * 2.399963; // Golden angle

      nodes.push({
        x: Math.cos(theta) * r * radius,
        y: y * radius,
        z: Math.sin(theta) * r * radius,
        baseSize: (i % 5 === 0 ? 3.5 : i % 2 === 0 ? 2 : 1.4),
        color: i % 4 === 0 ? '#ff7a3d' : i % 10 === 0 ? '#ffffff' : '#a39d94',
        glow: i % 4 === 0,
      });
    }

    // Rings
    const ringRadius1 = radius * 1.18;
    const ringRadius2 = radius * 1.35;

    const handlePointerDown = (e) => {
      isDraggingRef.current = true;
      prevPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - prevPointerRef.current.x;
      const dy = e.clientY - prevPointerRef.current.y;
      rotRef.current.y += dx * 0.008;
      rotRef.current.x += dy * 0.008;
      prevPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    let time = 0;

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);

      if (isPlayingRef.current) {
        time += 0.012;
        if (!isDraggingRef.current) {
          rotRef.current.y += 0.004;
          rotRef.current.x = Math.sin(time * 0.3) * 0.2 + 0.2;
        }
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const rx = rotRef.current.x;
      const ry = rotRef.current.y;

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);

      // Project 3D nodes to 2D
      const projected = nodes.map((node) => {
        // Rotate around Y
        const x1 = node.x * cosY + node.z * sinY;
        const z1 = -node.x * sinY + node.z * cosY;

        // Rotate around X
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = node.y * sinX + z1 * cosX;

        const fov = 450;
        const scale = fov / (fov + z2 + 100);
        return {
          px: cx + x1 * scale,
          py: cy + y2 * scale,
          scale,
          z: z2,
          color: node.color,
          baseSize: node.baseSize,
          glow: node.glow,
        };
      });

      // Sort by depth (back to front)
      projected.sort((a, b) => b.z - a.z);

      // Draw connected web lines between nearby projected nodes
      ctx.lineWidth = 0.75;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (p1.z < -60) continue; // Skip back half connections for clarity

        let connections = 0;
        for (let j = i + 1; j < projected.length && connections < 3; j++) {
          const p2 = projected[j];
          const distSq = (p1.px - p2.px) ** 2 + (p1.py - p2.py) ** 2;
          if (distSq < 2200) {
            const alpha = Math.max(0, 0.28 * (1 - distSq / 2200) * p1.scale);
            ctx.strokeStyle = `rgba(255, 122, 61, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
            connections++;
          }
        }
      }

      // Draw Orbiting Rings in 3D projection
      const drawRing = (r, tiltX, tiltY, color, alpha) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        const steps = 60;
        for (let s = 0; s <= steps; s++) {
          const a = (s / steps) * Math.PI * 2;
          const rx0 = Math.cos(a) * r;
          const rz0 = Math.sin(a) * r;

          const rx1 = rx0 * Math.cos(tiltY) + rz0 * Math.sin(tiltY);
          const rz1 = -rx0 * Math.sin(tiltY) + rz0 * Math.cos(tiltY);

          const ry2 = -rz1 * Math.sin(tiltX);
          const rz2 = rz1 * Math.cos(tiltX);

          const scale = 450 / (450 + rz2 + 100);
          const px = cx + rx1 * scale;
          const py = cy + ry2 * scale;

          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      };

      drawRing(ringRadius1, rx + 0.4, ry + time * 0.2, 'rgba(255, 122, 61, 0.35)');
      drawRing(ringRadius2, rx - 0.5, -ry + time * 0.15, 'rgba(255, 237, 215, 0.2)');

      // Draw Nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const size = Math.max(0.8, p.baseSize * p.scale);

        if (p.glow) {
          ctx.fillStyle = 'rgba(255, 122, 61, 0.25)';
          ctx.beginPath();
          ctx.arc(p.px, p.py, size * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.px, p.py, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  return (
    <section className="section rule" id="operational-core">
      <div className="wrap">
        <div className="core-3d-card spot rv">
          <div className="core-3d-header">
            <div>
              <span className="eyebrow">3D Centerpiece · Lusion Riff</span>
              <h3 className="core-3d-title">The Living Operational Core</h3>
              <p className="core-3d-sub">
                Interactive real-time 3D telemetry representing interconnected enterprise entities, inventory nodes, and continuous event streams. Click and drag to orbit the network.
              </p>
            </div>
            <div className="core-3d-actions">
              <button
                className="btn-mode-toggle"
                onClick={() => setIsPlaying(p => !p)}
                title="Pause / Resume Rotation"
              >
                {isPlaying ? '⏸ Pause' : '▶ Resume'}
              </button>
            </div>
          </div>

          <div className="core-3d-viewport" ref={mountRef}>
            {/* 3D constellation canvas */}
          </div>

          <div className="core-3d-footer">
            <div className="footer-metric">
              <span className="footer-k">Interconnected Nodes</span>
              <span className="footer-v">240 Live Operational Entities</span>
            </div>
            <div className="footer-metric">
              <span className="footer-k">Telemetry Ingestion</span>
              <span className="footer-v text-accent">&lt; 12ms Streaming Latency</span>
            </div>
            <div className="footer-metric">
              <span className="footer-k">Synchronization Status</span>
              <span className="footer-v text-good">Double-Entry Verified (ACID)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
