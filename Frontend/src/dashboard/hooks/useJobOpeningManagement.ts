import { useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../../context';
import type { BackendJobOpening } from '../types';

export const useJobOpeningManagement = () => {
  const { currentUser } = useAuth();
  const [jobOpenings, setJobOpenings] = useState<BackendJobOpening[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = useCallback(async () => {
    const token = await currentUser?.getIdToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    return { Authorization: `Bearer ${token}` };
  }, [currentUser]);

  const fetchJobOpenings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/job-openings`);
      setJobOpenings(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching job openings');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createJobOpening = useCallback(
    async (data: Omit<BackendJobOpening, '_id'>) => {
      const headers = await getAuthHeaders();
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/job-openings`, data, { headers });
      fetchJobOpenings();
    },
    [fetchJobOpenings, getAuthHeaders],
  );

  const updateJobOpening = useCallback(
    async (id: string, data: Omit<BackendJobOpening, '_id'>) => {
      const headers = await getAuthHeaders();
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/job-openings/${id}`, data, { headers });
      fetchJobOpenings();
    },
    [fetchJobOpenings, getAuthHeaders],
  );

  const deleteJobOpening = useCallback(
    async (id: string) => {
      const headers = await getAuthHeaders();
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/job-openings/${id}`, { headers });
      fetchJobOpenings();
    },
    [fetchJobOpenings, getAuthHeaders],
  );

  return {
    jobOpenings,
    isLoading,
    error,
    fetchJobOpenings,
    createJobOpening,
    updateJobOpening,
    deleteJobOpening,
  };
};
