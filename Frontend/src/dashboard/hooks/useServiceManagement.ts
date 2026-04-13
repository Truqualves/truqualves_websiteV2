import { useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../../context';
import type { BackendService } from '../types';

export const useServiceManagement = () => {
  const { currentUser } = useAuth();
  const [services, setServices] = useState<BackendService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = useCallback(async () => {
    const token = await currentUser?.getIdToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    return { Authorization: `Bearer ${token}` };
  }, [currentUser]);

  const fetchServices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/services?includeDraft=true`,
        { headers },
      );
      setServices(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching services');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [getAuthHeaders]);

  const deleteService = useCallback(
    async (id: number) => {
      try {
        const headers = await getAuthHeaders();
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/services/${id}`, { headers });
        fetchServices();
      } catch (err) {
        console.error('Error deleting service:', err);
      }
    },
    [fetchServices, getAuthHeaders],
  );

  const createService = useCallback(
    async (data: FormData) => {
      const headers = await getAuthHeaders();
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/services`, data, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchServices();
    },
    [fetchServices, getAuthHeaders],
  );

  const updateService = useCallback(
    async (id: number, data: FormData) => {
      const headers = await getAuthHeaders();
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/services/${id}`, data, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchServices();
    },
    [fetchServices, getAuthHeaders],
  );

  return {
    services,
    isLoading,
    error,
    fetchServices,
    deleteService,
    createService,
    updateService,
  };
};
