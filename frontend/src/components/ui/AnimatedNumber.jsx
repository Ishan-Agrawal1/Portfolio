import React from 'react';

export function AnimatedNumber({ value, suffix = '' }) {
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (value == null) return;
    const target = typeof value === 'string' ? parseInt(value, 10) : value;
    if (isNaN(target)) { setDisplay(value); return; }

    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [value]);

  return <>{display}{suffix}</>;
}

export default AnimatedNumber;
