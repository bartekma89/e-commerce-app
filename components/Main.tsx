import { ReactNode } from "react";

interface ComponentProps {
  children: ReactNode;
}

export default function Main({ children }: ComponentProps) {
  return <main className="flex-grow max-w-6xl mx-auto p-6">{children}</main>;
}
