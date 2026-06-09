'use client';

import { useEffect, useRef, useState } from 'react';

type Point = {
  x: number;
  y: number;
};

const pointerSize = 4;

export function PointerHalo() {
  const [enabled, setEnabled] = useState(false);
  const pointerRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener('change', update);

    const el = document.createElement('div');
    el.className = 'pointer-events-none fixed left-0 top-0 z-[60] hidden md:block';
    el.style.width = '16px';
    el.style.height = '16px';
    el.style.borderRadius = '999px';
    el.style.background = 'rgba(103,232,249,0.95)';
    el.style.boxShadow = '0 0 20px rgba(103,232,249,0.9)';
    el.style.transform = 'translate3d(-9999px, -9999px, 0)';
    el.style.willChange = 'transform, opacity';
    document.body.appendChild(el);
    pointerRef.current = el;

    const handleMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (pointerRef.current) pointerRef.current.style.opacity = '1';
    };

    const handleLeave = () => {
      if (pointerRef.current) pointerRef.current.style.opacity = '0';
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('mouseout', handleLeave);

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    const loop = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.35);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.35);
      if (pointerRef.current) {
        pointerRef.current.style.transform = `translate3d(${pos.current.x - 8}px, ${pos.current.y - 8}px, 0)`;
      }
      raf.current = requestAnimationFrame(loop);
    };

    raf.current = requestAnimationFrame(loop);

    return () => {
      media.removeEventListener('change', update);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('mouseout', handleLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
      if (pointerRef.current) pointerRef.current.remove();
    };
  }, []);

  if (!enabled) return null;
  return null; // pointer is injected directly into the DOM for high-performance updates
}
