import { useEffect, useRef } from "react";

export default function CursorPulse() {
  const ringRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
    };

    const render = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;
      const { x, y } = current.current;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${x - 17}px, ${y - 17}px, 0)`;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${target.current.x - 3}px, ${target.current.y - 3}px, 0)`;
      frameRef.current = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frameRef.current = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <>
      <span ref={ringRef} className="siah-cursor-ring" aria-hidden="true" />
      <span ref={dotRef} className="siah-cursor-dot" aria-hidden="true" />
    </>
  );
}
