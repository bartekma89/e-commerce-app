import React from "react";
import { useRouter } from "next/router";

import { NavLink } from "@/components";
import { PageType } from "./types";

interface ComponentProps {
  pages: PageType[];
}

export default function DesktopNav({ pages }: ComponentProps) {
  const { pathname } = useRouter();

  return (
    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
      <div className="hidden sm:block sm:ml-6">
        <div className="flex space-x-4">
          {pages.map(({ name, href }) => (
            <NavLink
              key={name}
              href={href}
              activeClassName={
                pathname === href
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }
              nonActiveClassName="text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <a className="px-3 py-2 rounded-md text-sm font-medium">{name}</a>
            </NavLink>
          ))}
        </div>
      </div>
    </div>

  );
}
