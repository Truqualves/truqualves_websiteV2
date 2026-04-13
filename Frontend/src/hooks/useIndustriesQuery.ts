import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { Industry } from "@/types/industry";

const INDUSTRIES_QUERY_KEY = ["industries"] as const;
const INDUSTRIES_STALE_TIME_MS = 5 * 60 * 1000;

const normalizeIndustriesList = (payload: unknown): Industry[] => {
  if (Array.isArray(payload)) return payload as Industry[];
  if (
    payload &&
    typeof payload === "object" &&
    "industries" in payload &&
    Array.isArray((payload as { industries: unknown }).industries)
  ) {
    return (payload as { industries: Industry[] }).industries;
  }
  return [];
};

const fetchIndustries = async (): Promise<Industry[]> => {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/industries`);
  return normalizeIndustriesList(res.data);
};

export const useIndustriesQuery = () =>
  useQuery({
    queryKey: INDUSTRIES_QUERY_KEY,
    queryFn: fetchIndustries,
    staleTime: INDUSTRIES_STALE_TIME_MS,
  });
