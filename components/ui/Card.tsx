import { ReactNode } from "react";
import { clsx } from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-slate-500/90 bg-slate-200/80 p-4 shadow-lg shadow-black/40",
        className
      )}
    >
      {children}
    </div>
  );
}
