import Link from "next/link";
import { ReactNode } from "react";

interface ComponentProps {
  children: ReactNode;
  href: string;
}

export default function NavLink({ children, href }: ComponentProps) {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  );
}
