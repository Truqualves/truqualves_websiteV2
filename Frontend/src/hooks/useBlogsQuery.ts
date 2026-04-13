import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { Blog } from "@/types/blog";

const BLOGS_QUERY_KEY = ["blogs"] as const;
const BLOG_STALE_TIME_MS = 5 * 60 * 1000;

const normalizeBlogsList = (payload: unknown): Blog[] => {
  if (Array.isArray(payload)) return payload as Blog[];
  if (
    payload &&
    typeof payload === "object" &&
    "blogs" in payload &&
    Array.isArray((payload as { blogs: unknown }).blogs)
  ) {
    return (payload as { blogs: Blog[] }).blogs;
  }
  return [];
};

const normalizeBlogDetail = (payload: unknown): Blog | null => {
  if (!payload || typeof payload !== "object") return null;
  if ("blog" in payload && (payload as { blog?: unknown }).blog) {
    return (payload as { blog: Blog }).blog;
  }
  return payload as Blog;
};

const fetchBlogs = async (): Promise<Blog[]> => {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs`);
  return normalizeBlogsList(res.data);
};

const fetchBlogById = async (id: number): Promise<Blog | null> => {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/${id}`);
  return normalizeBlogDetail(res.data);
};

export const useBlogsQuery = () =>
  useQuery({
    queryKey: BLOGS_QUERY_KEY,
    queryFn: fetchBlogs,
    staleTime: BLOG_STALE_TIME_MS,
  });

export const useBlogQuery = (id?: number) =>
  useQuery({
    queryKey: [...BLOGS_QUERY_KEY, id],
    queryFn: () => fetchBlogById(id as number),
    enabled: Number.isFinite(id),
    staleTime: BLOG_STALE_TIME_MS,
  });
