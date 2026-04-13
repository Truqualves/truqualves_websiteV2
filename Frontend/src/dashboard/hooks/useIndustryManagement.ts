import { useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../../context';
import type { BackendIndustry } from '../types';

export const useIndustryManagement = () => {
  const { currentUser } = useAuth();
  const [industries, setIndustries] = useState<BackendIndustry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = useCallback(async () => {
    const token = await currentUser?.getIdToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    return { Authorization: `Bearer ${token}` };
  }, [currentUser]);

  const fetchIndustries = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/industries`);
      setIndustries(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching industries');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createIndustry = useCallback(
    async (data: Omit<BackendIndustry, '_id'>) => {
      const headers = await getAuthHeaders();
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/industries`, data, { headers });
      fetchIndustries();
    },
    [fetchIndustries, getAuthHeaders],
  );

  const updateIndustry = useCallback(
    async (id: string, data: Omit<BackendIndustry, '_id'>) => {
      const headers = await getAuthHeaders();
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/industries/${id}`, data, { headers });
      fetchIndustries();
    },
    [fetchIndustries, getAuthHeaders],
  );

  const deleteIndustry = useCallback(
    async (id: string) => {
      const headers = await getAuthHeaders();
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/industries/${id}`, { headers });
      fetchIndustries();
    },
    [fetchIndustries, getAuthHeaders],
  );

  return {
    industries,
    isLoading,
    error,
    fetchIndustries,
    createIndustry,
    updateIndustry,
    deleteIndustry,
  };
};
