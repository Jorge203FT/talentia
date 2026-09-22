import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion
} from "motion/react";

function AnimatedCounter({ value, prefix = "", suffix = "", duration = 1.6 }) {
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, {
    once: true,
    amount: 0.6
  });

  const shouldReduceMotion = useReducedMotion();
  const counter = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useMotionValueEvent(counter, "change", (latest) => {
    setDisplayValue(Math.round(latest));
  });

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      counter.set(value);
      return;
    }

    const controls = animate(counter, value, {
      duration,
      ease: "easeOut"
    });

    return () => controls.stop();
  }, [counter, duration, isInView, shouldReduceMotion, value]);

  return (
    <motion.strong ref={counterRef}>
      {prefix}
      {displayValue.toLocaleString("en-US")}
      {suffix}
    </motion.strong>
  );
}

export default AnimatedCounter;