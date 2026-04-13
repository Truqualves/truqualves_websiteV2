import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context';
import type { BackendEvent, EventSummaryTotals } from '../types';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const useEventSummary = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState<BackendEvent[]>([]);
  const [totals, setTotals] = useState<EventSummaryTotals>({
    total: 0,
    active: 0,
    completed: 0,
    complianceScore: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const token = await currentUser?.getIdToken();
      if (!token) {
        setError('Authentication required to view dashboard data.');
        return;
      }
      const { data } = await axios.get(`${API_URL}/api/events/summary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(data.events || []);
      setTotals(data.totals || { total: 0, active: 0, completed: 0, complianceScore: 0 });
    } catch (err: unknown) {
      console.error('Error fetching event summary:', err);
      const message = err instanceof Error ? err.message : 'Failed to load summary';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return { events, totals, loading, error, fetchSummary };
};
