import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { TeamMember } from "@/types/team";

const TEAM_QUERY_KEY = ["team"] as const;
const TEAM_STALE_TIME_MS = 5 * 60 * 1000;

const normalizeTeamList = (payload: unknown): TeamMember[] => {
  if (Array.isArray(payload)) return payload as TeamMember[];
  if (
    payload &&
    typeof payload === "object" &&
    "teamMembers" in payload &&
    Array.isArray((payload as { teamMembers: unknown }).teamMembers)
  ) {
    return (payload as { teamMembers: TeamMember[] }).teamMembers;
  }
  return [];
};

const fetchTeam = async (): Promise<TeamMember[]> => {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/team`);
  return normalizeTeamList(res.data);
};

export const useTeamQuery = () =>
  useQuery({
    queryKey: TEAM_QUERY_KEY,
    queryFn: fetchTeam,
    staleTime: TEAM_STALE_TIME_MS,
  });
