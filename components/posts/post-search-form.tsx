import Link from "next/link";
import { Search } from "lucide-react";

type PostSearchFormProps = {
  defaultValue: string;
};

export function PostSearchForm({ defaultValue }: PostSearchFormProps) {
  return (
    <form className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-card sm:flex-row">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          name="search"
          defaultValue={defaultValue}
          placeholder="Search by title or content"
          className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 text-sm"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Search
        </button>
        <Link
          href="/"
          className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
        >
          Reset
        </Link>
      </div>
    </form>
  );
}
