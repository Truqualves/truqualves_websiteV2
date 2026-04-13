import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { CaseStudy } from "@/types/caseStudy";

const CASE_STUDIES_QUERY_KEY = ["case-studies"] as const;
const CASE_STUDIES_STALE_TIME_MS = 5 * 60 * 1000;

const normalizeCaseStudiesList = (payload: unknown): CaseStudy[] => {
  if (Array.isArray(payload)) return payload as CaseStudy[];
  if (
    payload &&
    typeof payload === "object" &&
    "caseStudies" in payload &&
    Array.isArray((payload as { caseStudies: unknown }).caseStudies)
  ) {
    return (payload as { caseStudies: CaseStudy[] }).caseStudies;
  }
  return [];
};

const fetchCaseStudies = async (): Promise<CaseStudy[]> => {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/case-studies`);
  return normalizeCaseStudiesList(res.data);
};

export const useCaseStudiesQuery = () =>
  useQuery({
    queryKey: CASE_STUDIES_QUERY_KEY,
    queryFn: fetchCaseStudies,
    staleTime: CASE_STUDIES_STALE_TIME_MS,
  });
