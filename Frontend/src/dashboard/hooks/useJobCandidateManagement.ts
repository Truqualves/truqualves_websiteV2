import { useCallback, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context';
import type { BackendJobCandidate, JobCandidateStatus } from '../types';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const useJobCandidateManagement = () => {
  const { currentUser } = useAuth();
  const [candidates, setCandidates] = useState<BackendJobCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchCandidates = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const token = await currentUser?.getIdToken();
      if (!token) {
        setLoading(false);
        setError('Authentication required to load candidate data.');
        return;
      }

      const { data } = await axios.get(`${API_URL}/api/job-candidates`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCandidates(data.candidates || []);
    } catch (err: unknown) {
      console.error('Error fetching job candidates:', err);
      const message = err instanceof Error ? err.message : 'Failed to load candidates';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  const updateCandidateStatus = useCallback(
    async (candidateId: string, status: JobCandidateStatus) => {
      try {
        setActionLoading(candidateId);
        const token = await currentUser?.getIdToken();
        if (!token) return;

        await axios.patch(
          `${API_URL}/api/job-candidates/${candidateId}/status`,
          { status },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

        setCandidates((prev) =>
          prev.map((candidate) =>
            candidate._id === candidateId ? { ...candidate, status } : candidate,
          ),
        );
      } catch (err: unknown) {
        console.error('Error updating candidate status:', err);
        const message = err instanceof Error ? err.message : 'Failed to update status';
        alert(`Failed to update candidate status: ${message}`);
      } finally {
        setActionLoading(null);
      }
    },
    [currentUser],
  );

  const deleteCandidate = useCallback(
    async (candidateId: string) => {
      try {
        setActionLoading(candidateId);
        const token = await currentUser?.getIdToken();
        if (!token) return;

        await axios.delete(`${API_URL}/api/job-candidates/${candidateId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCandidates((prev) => prev.filter((candidate) => candidate._id !== candidateId));
      } catch (err: unknown) {
        console.error('Error deleting candidate:', err);
        const message = err instanceof Error ? err.message : 'Failed to delete candidate';
        alert(`Failed to delete candidate: ${message}`);
      } finally {
        setActionLoading(null);
      }
    },
    [currentUser],
  );

  return {
    candidates,
    loading,
    error,
    actionLoading,
    fetchCandidates,
    updateCandidateStatus,
    deleteCandidate,
  };
};
