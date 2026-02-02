'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseScrollAnimationReturn {
  ref: React.RefObject<HTMLElement | null>;
  isVisible: boolean;
  hasAnimated: boolean;
}

export function useScrollAnimation(
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;

  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        setIsVisible(true);
        if (!hasAnimated) {
          setHasAnimated(true);
        }
      } else if (!triggerOnce) {
        setIsVisible(false);
      }
    },
    [hasAnimated, triggerOnce]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, threshold, rootMargin]);

  return { ref, isVisible, hasAnimated };
}

interface UseStaggeredAnimationOptions extends UseScrollAnimationOptions {
  staggerDelay?: number;
  itemCount: number;
}

interface UseStaggeredAnimationReturn {
  ref: React.RefObject<HTMLElement | null>;
  isVisible: boolean;
  getItemDelay: (index: number) => number;
  getItemStyle: (index: number) => React.CSSProperties;
}

export function useStaggeredAnimation(
  options: UseStaggeredAnimationOptions
): UseStaggeredAnimationReturn {
  const { staggerDelay = 100, itemCount, ...scrollOptions } = options;
  const { ref, isVisible } = useScrollAnimation(scrollOptions);

  const getItemDelay = useCallback(
    (index: number) => index * staggerDelay,
    [staggerDelay]
  );

  const getItemStyle = useCallback(
    (index: number): React.CSSProperties => ({
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 400ms cubic-bezier(0.34, 1.56, 0.64, 1) ${getItemDelay(index)}ms, transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1) ${getItemDelay(index)}ms`,
    }),
    [isVisible, getItemDelay]
  );

  return { ref, isVisible, getItemDelay, getItemStyle };
}
