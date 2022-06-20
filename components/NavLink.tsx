import { Children, ReactElement, cloneElement } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

interface ComponentProps {
  children: ReactElement;
  href: string;
  activeClassName?: string;
  nonActiveClassName?: string;
}

export default function NavLink({
  children,
  activeClassName,
  nonActiveClassName,
  href,
  ...props
}: ComponentProps) {
  const { pathname } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || "";

  const className =
    pathname === href
      ? `${childClassName} ${activeClassName ?? ""}`.trim()
      : `${childClassName} ${nonActiveClassName ?? ""}`.trim();

  return (
    <Link href={href} {...props}>
      {cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
}
