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
        "rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4 shadow-lg shadow-black/40",
        className
      )}
    >
      {children}
    </div>
  );
}
