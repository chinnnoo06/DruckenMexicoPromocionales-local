import React from 'react'

export const SectionWrapper = ({ children, className = 'container-main-content flex flex-col pt-8 pb-12 sm:pt-12 sm:pb-16 gap-5 mx-auto max-w-[1300px]' }) => {
  return (
    <div className={` ${className}`}>
      {children}
    </div>
  );
};
