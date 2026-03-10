import { useRef } from "react";

export function useMagnet(strength = 0.35) {
  const ref = useRef(null);
  const animRef = useRef(null);
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const springBack = () => {
    const el = ref.current;
    if (!el) return;
    const dx = current.current.x + (target.current.x - current.current.x) * 0.18;
    const dy = current.current.y + (target.current.y - current.current.y) * 0.18;
    current.current = { x: dx, y: dy };
    el.style.transform = `translate(${dx}px, ${dy}px)`;
    if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
      animRef.current = requestAnimationFrame(springBack);
    } else {
      current.current = { x: 0, y: 0 };
      el.style.transform = "translate(0,0)";
    }
  };

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    current.current = { x: dx, y: dy };
    target.current = { x: dx, y: dy };
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onMouseLeave = () => {
    target.current = { x: 0, y: 0 };
    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(springBack);
  };

  return { ref, onMouseMove, onMouseLeave };
}

