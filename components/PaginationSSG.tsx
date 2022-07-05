import React from "react";

import { NavLink as Link } from "@/components";
import { classNames } from "@/lib/helpers";

interface ComponentProps {
  page: number;
  totalPages: number;
  handlePagination: (page: number) => void;
}

function Pagination({ page, totalPages, handlePagination }: ComponentProps) {
  const renderDots = () => (
    <span className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
      ...
    </span>
  );

  return (
    <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
      <div className="md:-mt-px md:flex">
        {page !== 1 && (
          <button
            onClick={() => handlePagination(page - 1)}
            type="button"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
          >
            &lt;
          </button>
        )}
        <Link href="/products/1">
          <a
            className={classNames(
              page === 1
                ? "border-indigo-500 text-indigo-600 "
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 ",
              "border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
            )}
          >
            1
          </a>
        </Link>
        {page > 3 && renderDots()}
        {page === totalPages && totalPages > 3 && (
          <Link href={`/products/${page - 2}`}>
            <a className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
              {page - 2}
            </a>
          </Link>
        )}
        {page > 2 && (
          <Link href={`/products/${page - 1}`}>
            <a className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
              {page - 1}
            </a>
          </Link>
        )}
        {page !== 1 && page !== totalPages && (
          <Link href={`/products/${page}`}>
            <a className="border-transparent hover:text-gray-700 hover:border-gray-300  border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
              {page}
            </a>
          </Link>
        )}
        {page < totalPages - 1 && (
          <Link href={`/products/${page + 1}`}>
            <a className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
              {page + 1}
            </a>
          </Link>
        )}
        {page === 1 && totalPages > 3 && (
          <Link href={`/products/${page + 2}`}>
            <a className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
              {page + 2}
            </a>
          </Link>
        )}
        {page < totalPages - 2 && renderDots()}
        <Link href={`/products/${totalPages}`}>
          <a
            className={classNames(
              page === totalPages
                ? "border-indigo-500 text-indigo-600 "
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 ",
              "border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
            )}
          >
            {totalPages}
          </a>
        </Link>
        {page !== totalPages && (
          <button
            onClick={() => handlePagination(page + 1)}
            type="button"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
          >
            &gt;
          </button>
        )}
      </div>
    </nav>
  );
}

export default Pagination;
