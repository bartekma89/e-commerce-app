import React from "react";
import { useRouter } from "next/router";

import { Disclosure } from "@headlessui/react";
import { NavLink } from "@/components";

import { classNames } from "@/lib/helpers";
import { PageType } from "./types";

interface ComponentProps {
  pages: PageType[];
}

export default function MobileNav({ pages }: ComponentProps) {
  const { pathname } = useRouter();

  return (
    <Disclosure.Panel className="sm:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {pages.map(({ name, href }) => (
          <Disclosure.Button
            key={name}
            className={classNames(
              pathname === href
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "block px-3 py-2 rounded-md text-base font-medium"
            )}
          >
            <NavLink href={href}>
              <a>{name}</a>
            </NavLink>
          </Disclosure.Button>
        ))}
      </div>
    </Disclosure.Panel>
  );
}
