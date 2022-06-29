import React from "react";

import { classNames } from "@/lib/helpers";

interface ComponentProps {
  page: number;
  totalPages: number;
  handlePagination: (page: number) => void;
}

function Pagination({ page, totalPages, handlePagination }: ComponentProps) {
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
        <button
          onClick={() => handlePagination(1)}
          type="button"
          className={classNames(
            page === 1
              ? "border-indigo-500 text-indigo-600 "
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 ",
            "border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
          )}
        >
          {1}
        </button>
        {page > 3 && (
          <span className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
            ...
          </span>
        )}
        {page === totalPages && totalPages > 3 && (
          <button
            onClick={() => handlePagination(page - 2)}
            type="button"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
          >
            {page - 2}
          </button>
        )}
        {page > 2 && (
          <button
            onClick={() => handlePagination(page - 1)}
            type="button"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
          >
            {page - 1}
          </button>
        )}
        {page !== 1 && page !== totalPages && (
          <button
            onClick={() => handlePagination(page)}
            type="button"
            className="border-transparent hover:text-gray-700 hover:border-gray-300  border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
          >
            {page}
          </button>
        )}
        {page < totalPages - 1 && (
          <button
            onClick={() => handlePagination(page + 1)}
            type="button"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
          >
            {page + 1}
          </button>
        )}
        {page === 1 && totalPages > 3 && (
          <button
            onClick={() => handlePagination(page + 2)}
            type="button"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
          >
            {page + 2}
          </button>
        )}
        {page < totalPages - 2 && (
          <span className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
            ...
          </span>
        )}
        <button
          onClick={() => handlePagination(totalPages)}
          type="button"
          className={classNames(
            page === totalPages
              ? "border-indigo-500 text-indigo-600 "
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 ",
            "border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
          )}
        >
          {totalPages}
        </button>
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
