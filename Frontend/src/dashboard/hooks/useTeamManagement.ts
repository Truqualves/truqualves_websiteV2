import { useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../../context';
import type { BackendTeamMember } from '../types';

export const useTeamManagement = () => {
  const { currentUser } = useAuth();
  const [teamMembers, setTeamMembers] = useState<BackendTeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = useCallback(async () => {
    const token = await currentUser?.getIdToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    return { Authorization: `Bearer ${token}` };
  }, [currentUser]);

  const fetchTeamMembers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/team`);
      setTeamMembers(res.data);
    } catch (err) {
      setError('Error fetching team members');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTeamMember = useCallback(
    async (data: FormData) => {
      const headers = await getAuthHeaders();
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/team`, data, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchTeamMembers();
    },
    [fetchTeamMembers, getAuthHeaders],
  );

  const updateTeamMember = useCallback(
    async (id: string, data: FormData) => {
      const headers = await getAuthHeaders();
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/team/${id}`, data, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchTeamMembers();
    },
    [fetchTeamMembers, getAuthHeaders],
  );

  const deleteTeamMember = useCallback(
    async (id: string) => {
      const headers = await getAuthHeaders();
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/team/${id}`, { headers });
      fetchTeamMembers();
    },
    [fetchTeamMembers, getAuthHeaders],
  );

  return {
    teamMembers,
    isLoading,
    error,
    fetchTeamMembers,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
  };
};
