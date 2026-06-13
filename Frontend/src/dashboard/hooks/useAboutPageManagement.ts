import { useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../../context';
import type { BackendAboutPage } from '../types';

export const useAboutPageManagement = () => {
  const { currentUser } = useAuth();
  const [aboutPage, setAboutPage] = useState<BackendAboutPage>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = useCallback(async () => {
    const token = await currentUser?.getIdToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    return { Authorization: `Bearer ${token}` };
  }, [currentUser]);

  const fetchAboutPage = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/about-page`);
      setAboutPage(res.data || {});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching about page content');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateAboutPage = useCallback(
    async (data: FormData) => {
      const headers = await getAuthHeaders();
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/about-page`,
        data,
        { 
          headers: {
            ...headers,
            'Content-Type': 'multipart/form-data',
          }
        },
      );
      setAboutPage(res.data.content || {});
      return res.data;
    },
    [getAuthHeaders],
  );

  return {
    aboutPage,
    isLoading,
    error,
    fetchAboutPage,
    updateAboutPage,
  };
};
