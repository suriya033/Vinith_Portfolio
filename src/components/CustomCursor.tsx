import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.classList.add('custom-cursor-active');

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (target) {
        const isInteractive =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') !== null ||
          target.closest('a') !== null ||
          target.classList.contains('interactive-hover');
        setIsHovered(isInteractive);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring cursor */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full transition-transform duration-100 ease-out ${
          isHovered
            ? 'w-12 h-12 -mt-6 -ml-6 border-2 border-cyan-400 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-110'
            : isClicking
            ? 'w-8 h-8 -mt-4 -ml-4 border border-cyan-300 bg-cyan-400/20 scale-90'
            : 'w-7 h-7 -mt-3.5 -ml-3.5 border border-cyan-400/60 bg-transparent'
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
        }}
      />
      {/* Inner glowing dot */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-cyan-400 transition-transform duration-75 ease-out ${
          isHovered ? 'w-2 h-2 -mt-1 -ml-1 bg-white shadow-[0_0_10px_#fff]' : 'w-1.5 h-1.5 -mt-0.75 -ml-0.75 shadow-[0_0_8px_#06b6d4]'
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
        }}
      />
    </>
  );
};
