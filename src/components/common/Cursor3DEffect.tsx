import React, { useEffect, useState } from 'react';

const Cursor3DEffect: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    // Hide on touch-only devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let animationFrameId: number;
    let targetX = -100;
    let targetY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Compute subtle 3D tilt based on screen offset
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const rx = ((e.clientY - cy) / cy) * 15;
      const ry = ((e.clientX - cx) / cx) * -15;

      setPos({ x: e.clientX, y: e.clientY });
      setTilt({ rx, ry });

      // Detect if hovering interactive elements
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('.cursor-pointer') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);

    // Smooth lerp for trailing 3D ring
    let currTrailX = -100;
    let currTrailY = -100;

    const loop = () => {
      currTrailX += (targetX - currTrailX) * 0.18;
      currTrailY += (targetY - currTrailY) * 0.18;
      setTrailPos({ x: currTrailX, y: currTrailY });
      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    loop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer 3D Trailing Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full transition-transform duration-100 ease-out border-2 border-amber-600/40 shadow-[0_0_20px_rgba(125,63,39,0.35)] backdrop-blur-[1px] ${
          isHovered
            ? 'w-12 h-12 -mt-6 -ml-6 border-amber-500/80 bg-amber-900/15 scale-125'
            : isClicked
            ? 'w-8 h-8 -mt-4 -ml-4 scale-90 border-amber-700/60'
            : 'w-9 h-9 -mt-4.5 -ml-4.5'
        }`}
        style={{
          transform: `translate3d(${trailPos.x}px, ${trailPos.y}px, 0px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          perspective: '600px',
          transformStyle: 'preserve-3d',
        }}
      />

      {/* Inner Glowing 3D Orb */}
      <div
        className={`fixed top-0 left-0 rounded-full bg-gradient-to-br from-amber-400 via-amber-700 to-amber-950 shadow-[0_4px_12px_rgba(42,18,10,0.6)] transition-all duration-75 ease-out ${
          isHovered
            ? 'w-4 h-4 -mt-2 -ml-2 bg-amber-400 ring-4 ring-amber-500/30 shadow-[0_0_25px_rgba(200,122,75,0.9)] scale-110'
            : isClicked
            ? 'w-2.5 h-2.5 -mt-1.25 -ml-1.25 scale-75'
            : 'w-3.5 h-3.5 -mt-1.75 -ml-1.75'
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 20px)`,
        }}
      />
    </div>
  );
};

export default Cursor3DEffect;
