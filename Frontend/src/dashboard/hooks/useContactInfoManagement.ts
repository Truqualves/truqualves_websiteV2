import { useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../../context';
import type { BackendContactInfo } from '../types';

export const useContactInfoManagement = () => {
  const { currentUser } = useAuth();
  const [contactInfo, setContactInfo] = useState<BackendContactInfo>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = useCallback(async () => {
    const token = await currentUser?.getIdToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    return { Authorization: `Bearer ${token}` };
  }, [currentUser]);

  const fetchContactInfo = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/contact-info`);
      setContactInfo(res.data || {});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching contact info');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateContactInfo = useCallback(
    async (data: BackendContactInfo) => {
      const headers = await getAuthHeaders();
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact-info`,
        data,
        { headers },
      );
      setContactInfo(res.data || {});
      return res.data;
    },
    [getAuthHeaders],
  );

  return {
    contactInfo,
    isLoading,
    error,
    fetchContactInfo,
    updateContactInfo,
  };
};
