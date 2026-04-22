import { redirect } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { PostsTable } from "@/components/dashboard/posts-table";
import { getCurrentProfile } from "@/lib/auth";
import { canCreatePost } from "@/lib/permissions";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { PostListItem } from "@/types";

type PostUserJoin = { name: string | null } | { name: string | null }[] | null;

export default async function MyPostsPage() {
  const profile = await getCurrentProfile();

  if (!canCreatePost(profile)) {
    redirect("/unauthorized");
  }

  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("id, title, image_url, summary, created_at, author_id, users(name)")
    .order("created_at", { ascending: false });

  const filteredPosts =
    profile!.role === "admin"
      ? data
      : data?.filter((post) => post.author_id === profile!.id);

  if (error) {
    throw new Error(error.message);
  }

  const posts: PostListItem[] =
    filteredPosts?.map((post) => {
      const users = post.users as PostUserJoin;

      return {
        id: post.id,
        title: post.title,
        image_url: post.image_url,
        summary: post.summary,
        created_at: post.created_at,
        author_id: post.author_id,
        author_name:
          post.author_id === profile!.id
            ? profile!.name ?? "You"
            : Array.isArray(users)
              ? (users[0]?.name ?? "Author")
              : (users?.name ?? "Author"),
      };
    }) ?? [];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="My posts"
        title={profile!.role === "admin" ? "Manage platform posts" : "Manage your published content"}
        description={
          profile!.role === "admin"
            ? "Admins can review and edit any post from this dashboard."
            : "This page is intentionally simple for the assignment: create, review, and edit your authored posts in one place."
        }
      />
      <PostsTable posts={posts} canDelete={profile!.role === "admin"} />
    </div>
  );
}
