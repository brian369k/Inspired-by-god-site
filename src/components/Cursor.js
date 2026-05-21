import React, { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    if (isMobile) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot.current) {
        dot.current.style.left = mouseX + 'px';
        dot.current.style.top = mouseY + 'px';
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ring.current) {
        ring.current.style.left = ringX + 'px';
        ring.current.style.top = ringY + 'px';
      }
      raf = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      if (ring.current) ring.current.style.transform = 'translate(-50%,-50%) scale(1.8)';
      if (dot.current) dot.current.style.opacity = '0';
    };

    const onLeaveLink = () => {
      if (ring.current) ring.current.style.transform = 'translate(-50%,-50%) scale(1)';
      if (dot.current) dot.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);

    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    // Re-attach on DOM changes
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="fixed w-2 h-2 bg-gold rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
        style={{ position: 'fixed', top: 0, left: 0 }}
      />
      <div
        ref={ring}
        className="fixed w-8 h-8 border border-gold rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ position: 'fixed', top: 0, left: 0, transition: 'transform 0.2s ease' }}
      />
    </>
  );
}
