import { ReactNode } from "react";

type GridProps = {
  children: ReactNode;
  className?: string;
};

export default function Grid({ children, className = "" }: GridProps) {
  return (
    <div
      className={`grid grid-cols-8 md:grid-cols-10 lg:grid-cols-12 ${className}`}
    >
      {children}
    </div>
  );
}
