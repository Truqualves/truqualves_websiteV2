import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { BackendAboutPage } from "@/dashboard/types";

const ABOUT_PAGE_QUERY_KEY = ["about-page"] as const;
const ABOUT_PAGE_STALE_TIME_MS = 10 * 60 * 1000; // 10 minutes

const fetchAboutPage = async (): Promise<BackendAboutPage | null> => {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/about-page`);
  return res.data || null;
};

export const useAboutPageQuery = () =>
  useQuery({
    queryKey: ABOUT_PAGE_QUERY_KEY,
    queryFn: fetchAboutPage,
    staleTime: ABOUT_PAGE_STALE_TIME_MS,
  });
