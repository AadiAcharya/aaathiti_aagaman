import { useEffect, useRef, useState } from "react";

// Renders children at a fixed design width, then scales the whole block down
// (via CSS transform) to fit whatever width the parent actually has — keeps
// the dashboard mockup crisp and proportional at any viewport size.
const DESIGN_WIDTH = 896;

export default function ScaledDashboard({ children }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const update = () => {
      const nextScale = outer.offsetWidth / DESIGN_WIDTH;
      setScale(nextScale);
      setHeight(inner.offsetHeight * nextScale);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(outer);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={outerRef} style={{ height }}>
      <div
        ref={innerRef}
        style={{
          width: DESIGN_WIDTH,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
