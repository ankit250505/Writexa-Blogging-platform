import { clsx } from "clsx";

export function cn(...inputs: Array<string | false | null | undefined>) {
  return clsx(inputs);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(new Date(date));
}

export function truncate(text: string, maxLength = 180) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}...`;
}

export function getPaginationPages(currentPage: number, totalPages: number) {
  const pages = [];
  const start = Math.max(1, currentPage - 1);
  const end = Math.min(totalPages, currentPage + 1);

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  return pages;
}
