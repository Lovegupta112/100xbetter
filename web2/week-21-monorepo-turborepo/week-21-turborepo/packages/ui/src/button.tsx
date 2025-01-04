"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  size:'medium' | 'small';
  onClick:()=>void;
}

export const Button = ({ children, className,size,onClick }: ButtonProps) => {
  return (
    <button
      className={className}
      style={{
        padding:size=='small'?'0 0.5rem':'0.5rem 1rem',
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
