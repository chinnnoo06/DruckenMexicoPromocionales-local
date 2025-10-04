import React, { useRef } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export const SectionWrapper = ({ children, className = 'container-main-content flex flex-col pt-8 pb-12 sm:pt-12 sm:pb-16 gap-5 mx-auto max-w-[1300px]' }) => {

  const sectionRef = useRef(null);
  const isVisible = useIntersectionObserver(sectionRef, {
    threshold: 0,
    triggerOnce: true
  });
  return (
    <div ref={sectionRef} className={` ${className} ${isVisible ? 'animate-fadeUp' : 'opacity-0'}`}>
      {children}
    </div>
  );
};
