import { POSTS_PER_PAGE } from "@/lib/constants";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { PostDetail, PostListItem } from "@/types";

type RawAuthor = { name: string | null } | { name: string | null }[] | null;

function getAuthorName(author: RawAuthor) {
  if (Array.isArray(author)) {
    return author[0]?.name ?? "Unknown author";
  }

  return author?.name ?? "Unknown author";
}

export async function getPublishedPosts(params: {
  page: number;
  search: string;
}) {
  const from = (params.page - 1) * POSTS_PER_PAGE;
  const to = from + POSTS_PER_PAGE - 1;

  let query = supabaseAdmin
    .from("posts")
    .select("id, title, image_url, summary, created_at, author_id, users(name)", {
      count: "exact",
    })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (params.search) {
    query = query.or(
      `title.ilike.%${params.search}%,body.ilike.%${params.search}%`,
    );
  }

  const { data, count, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const posts: PostListItem[] =
    data?.map((post) => ({
      id: post.id,
      title: post.title,
      image_url: post.image_url,
      summary: post.summary,
      created_at: post.created_at,
      author_id: post.author_id,
      author_name: getAuthorName(post.users as RawAuthor),
    })) ?? [];

  return {
    posts,
    totalCount: count ?? 0,
    totalPages: Math.max(1, Math.ceil((count ?? 0) / POSTS_PER_PAGE)),
  };
}

export async function getPostById(postId: string) {
  const { data, error } = await supabaseAdmin
    .from("posts")
    .select(
      "id, title, body, image_url, summary, created_at, updated_at, author_id, users(name)",
    )
    .eq("id", postId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }

  const post: PostDetail = {
    id: data.id,
    title: data.title,
    body: data.body,
    image_url: data.image_url,
    summary: data.summary,
    created_at: data.created_at,
    updated_at: data.updated_at,
    author_id: data.author_id,
    author_name: getAuthorName(data.users as RawAuthor),
  };

  return post;
}
