import Link from "next/link";

import { getPaginationPages } from "@/lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  search: string;
};

function createHref(page: number, search: string) {
  const params = new URLSearchParams();
  params.set("page", String(page));

  if (search) {
    params.set("search", search);
  }

  return `/?${params.toString()}`;
}

export function Pagination({ currentPage, totalPages, search }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getPaginationPages(currentPage, totalPages);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {currentPage > 1 ? (
        <Link
          href={createHref(currentPage - 1, search)}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
        >
          Previous
        </Link>
      ) : null}

      {pages.map((page) => (
        <Link
          key={page}
          href={createHref(page, search)}
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            page === currentPage
              ? "bg-ink text-white"
              : "border border-slate-300 text-slate-700"
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link
          href={createHref(currentPage + 1, search)}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
        >
          Next
        </Link>
      ) : null}
    </div>
  );
}
