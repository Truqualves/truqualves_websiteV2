import { useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../../context';
import type { BackendCaseStudy } from '../types';

export const useCaseStudyManagement = () => {
  const { currentUser } = useAuth();
  const [caseStudies, setCaseStudies] = useState<BackendCaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = useCallback(async () => {
    const token = await currentUser?.getIdToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    return { Authorization: `Bearer ${token}` };
  }, [currentUser]);

  const fetchCaseStudies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/case-studies`);
      setCaseStudies(res.data);
    } catch (err) {
      setError('Error fetching case studies');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createCaseStudy = useCallback(
    async (data: Omit<BackendCaseStudy, '_id'>) => {
      const headers = await getAuthHeaders();
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/case-studies`, data, { headers });
      fetchCaseStudies();
    },
    [fetchCaseStudies, getAuthHeaders],
  );

  const updateCaseStudy = useCallback(
    async (id: string, data: Omit<BackendCaseStudy, '_id'>) => {
      const headers = await getAuthHeaders();
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/case-studies/${id}`, data, { headers });
      fetchCaseStudies();
    },
    [fetchCaseStudies, getAuthHeaders],
  );

  const deleteCaseStudy = useCallback(
    async (id: string) => {
      const headers = await getAuthHeaders();
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/case-studies/${id}`, { headers });
      fetchCaseStudies();
    },
    [fetchCaseStudies, getAuthHeaders],
  );

  return {
    caseStudies,
    isLoading,
    error,
    fetchCaseStudies,
    createCaseStudy,
    updateCaseStudy,
    deleteCaseStudy,
  };
};
