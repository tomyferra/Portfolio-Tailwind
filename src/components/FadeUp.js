import React from 'react';
import { useInView } from '../hooks/useInView';

const FadeUp = ({ children, delay = 0, className = '' }) => {
  const [ref, isInView] = useInView();
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const style = prefersReducedMotion
    ? {}
    : {
        transitionDelay: `${delay}ms`,
        transform: isInView ? 'translateY(0)' : 'translateY(14px)',
      };

  const opacityClass = prefersReducedMotion
    ? ''
    : isInView
    ? 'opacity-100'
    : 'opacity-0';

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${opacityClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default FadeUp;
