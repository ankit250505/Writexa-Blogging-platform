import Link from "next/link";

import { deletePostAction } from "@/lib/actions/post-actions";
import { formatDate, truncate } from "@/lib/utils";
import type { PostListItem } from "@/types";

type PostsTableProps = {
  posts: PostListItem[];
  canDelete?: boolean;
};

export function PostsTable({ posts, canDelete = false }: PostsTableProps) {
  if (!posts.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
        No posts yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Post
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Summary
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Created
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-5 py-4">
                  <div>
                    <p className="font-semibold text-ink">{post.title}</p>
                    <p className="text-sm text-slate-500">{post.author_name}</p>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">
                  {truncate(post.summary || "Summary unavailable", 120)}
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">
                  {formatDate(post.created_at)}
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/dashboard/edit-post/${post.id}`}
                      className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      Edit
                    </Link>
                    {canDelete ? (
                      <form action={deletePostAction.bind(null, post.id)}>
                        <button
                          type="submit"
                          className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </form>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
