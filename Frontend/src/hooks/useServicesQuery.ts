import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { Service } from "@/types/service";

const SERVICES_QUERY_KEY = ["services"] as const;
const SERVICE_STALE_TIME_MS = 5 * 60 * 1000;

const normalizeServicesList = (payload: unknown): Service[] => {
  if (Array.isArray(payload)) return payload as Service[];
  if (
    payload &&
    typeof payload === "object" &&
    "services" in payload &&
    Array.isArray((payload as { services: unknown }).services)
  ) {
    return (payload as { services: Service[] }).services;
  }
  return [];
};

const normalizeServiceDetail = (payload: unknown): Service | null => {
  if (!payload || typeof payload !== "object") return null;
  if ("service" in payload && (payload as { service?: unknown }).service) {
    return (payload as { service: Service }).service;
  }
  return payload as Service;
};

const fetchServices = async (): Promise<Service[]> => {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/services`);
  return normalizeServicesList(res.data);
};

const fetchServiceBySlug = async (slug: string): Promise<Service | null> => {
  const res = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/services/${slug}`,
  );
  return normalizeServiceDetail(res.data);
};

export const useServicesQuery = () =>
  useQuery({
    queryKey: SERVICES_QUERY_KEY,
    queryFn: fetchServices,
    staleTime: SERVICE_STALE_TIME_MS,
  });

export const useServiceQuery = (slug?: string) =>
  useQuery({
    queryKey: [...SERVICES_QUERY_KEY, slug],
    queryFn: () => fetchServiceBySlug(slug as string),
    enabled: Boolean(slug),
    staleTime: SERVICE_STALE_TIME_MS,
  });
