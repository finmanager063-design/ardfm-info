"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Задержка перед стартом анимации, мс */
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  /** Дочерние элементы по очереди (как карточки MetaMask) */
  stagger?: boolean;
  as?: ElementType;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  stagger = false,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as ElementType;
  const style = { "--motion-delay": `${delay}ms` } as CSSProperties;

  return (
    <Component
      ref={ref}
      className={[
        "motion-reveal",
        `motion-reveal--${direction}`,
        stagger ? "motion-stagger" : "",
        visible ? "motion-reveal--visible" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </Component>
  );
}
