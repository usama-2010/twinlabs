import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface p-6 ${
        hover ? "transition-shadow duration-200 hover:shadow-md" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
