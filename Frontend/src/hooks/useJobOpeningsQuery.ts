import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { JobOpening } from "@/types/jobOpening";

const JOB_OPENINGS_QUERY_KEY = ["job-openings"] as const;
const JOB_OPENINGS_STALE_TIME_MS = 5 * 60 * 1000;

const normalizeJobOpenings = (payload: unknown): JobOpening[] => {
  if (Array.isArray(payload)) return payload as JobOpening[];
  if (
    payload &&
    typeof payload === "object" &&
    "jobOpenings" in payload &&
    Array.isArray((payload as { jobOpenings: unknown }).jobOpenings)
  ) {
    return (payload as { jobOpenings: JobOpening[] }).jobOpenings;
  }
  return [];
};

const fetchJobOpenings = async (): Promise<JobOpening[]> => {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/job-openings`);
  return normalizeJobOpenings(res.data);
};

export const useJobOpeningsQuery = () =>
  useQuery({
    queryKey: JOB_OPENINGS_QUERY_KEY,
    queryFn: fetchJobOpenings,
    staleTime: JOB_OPENINGS_STALE_TIME_MS,
  });
