import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { ContactInfo } from "@/types/contactInfo";

const CONTACT_INFO_QUERY_KEY = ["contact-info"] as const;
const CONTACT_INFO_STALE_TIME_MS = 5 * 60 * 1000;

const fetchContactInfo = async (): Promise<ContactInfo> => {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/contact-info`);
  return res.data || {};
};

export const useContactInfoQuery = () =>
  useQuery({
    queryKey: CONTACT_INFO_QUERY_KEY,
    queryFn: fetchContactInfo,
    staleTime: CONTACT_INFO_STALE_TIME_MS,
  });
