"use client";

import { useEffect, useRef } from "react";

const LAYER_COUNT = 7;

export default function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;
    let activePhase = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const size = Math.min(width, height) * 0.42;

      angle += 0.008;
      activePhase += 0.025;

      const activeIndex = ((Math.sin(activePhase) + 1) / 2) * (LAYER_COUNT - 1);

      // Draw 7 isometric floating slices
      for (let i = 0; i < LAYER_COUNT; i++) {
        const yOffset = (i - (LAYER_COUNT - 1) / 2) * 32;
        const dist = Math.abs(i - activeIndex);
        const intensity = Math.max(0, 1 - dist);

        // Calculate 3D isometric rotation projection
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        const p1 = { x: (-size * cosA - size * sinA) * 0.7, y: (-size * sinA + size * cosA) * 0.35 + yOffset };
        const p2 = { x: (size * cosA - size * sinA) * 0.7, y: (size * sinA + size * cosA) * 0.35 + yOffset };
        const p3 = { x: (size * cosA + size * sinA) * 0.7, y: (size * sinA - size * cosA) * 0.35 + yOffset };
        const p4 = { x: (-size * cosA + size * sinA) * 0.7, y: (-size * sinA - size * cosA) * 0.35 + yOffset };

        ctx.save();
        ctx.translate(centerX, centerY);

        // Path of the slice
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.closePath();

        // Fill with panel translucent color + accent glow
        ctx.fillStyle = intensity > 0.3
          ? `rgba(142, 182, 155, ${0.15 + intensity * 0.3})`
          : "rgba(11, 43, 38, 0.25)";
        ctx.fill();

        // Border styling
        ctx.strokeStyle = intensity > 0.4
          ? `rgba(142, 182, 155, ${0.4 + intensity * 0.6})`
          : "rgba(22, 56, 50, 0.45)";
        ctx.lineWidth = intensity > 0.5 ? 2 : 1;
        ctx.stroke();

        // Crosshair coordinates on active slice
        if (intensity > 0.6) {
          ctx.beginPath();
          ctx.moveTo((p1.x + p3.x) / 2 - 15, (p1.y + p3.y) / 2);
          ctx.lineTo((p1.x + p3.x) / 2 + 15, (p1.y + p3.y) / 2);
          ctx.moveTo((p1.x + p3.x) / 2, (p1.y + p3.y) / 2 - 15);
          ctx.lineTo((p1.x + p3.x) / 2, (p1.y + p3.y) / 2 + 15);
          ctx.strokeStyle = "rgba(218, 241, 222, 0.8)";
          ctx.stroke();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <canvas ref={canvasRef} className="h-full w-full max-h-[460px]" />
    </div>
  );
}
