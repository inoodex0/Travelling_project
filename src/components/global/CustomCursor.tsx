'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, input, select, textarea, [role="button"]');
      if (isClickable) {
        cursor.style.width = '60px';
        cursor.style.height = '60px';
        cursor.style.borderColor = '#22d3ee';
        cursor.style.backgroundColor = 'rgba(34, 211, 238, 0.08)';
        dot.style.width = '8px';
        dot.style.height = '8px';
        dot.style.backgroundColor = '#fff';
      } else {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.borderColor = '#fff';
        cursor.style.backgroundColor = 'transparent';
        dot.style.width = '6px';
        dot.style.height = '6px';
        dot.style.backgroundColor = '#22d3ee';
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] hidden lg:block"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '2px solid #fff',
          transform: 'translate(-50%, -50%)',
          left: 0,
          top: 0,
          willChange: 'transform',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background-color 0.3s ease',
        }}
      />
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] hidden lg:block"
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#22d3ee',
          transform: 'translate(-50%, -50%)',
          left: 0,
          top: 0,
          willChange: 'transform',
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease',
        }}
      />
    </>
  );
}
