import { useCallback, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context';
import type { BackendEvent, EventStatus } from '../types';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const useEventManagement = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState<BackendEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const token = await currentUser?.getIdToken();
      if (!token) {
        setLoading(false);
        setError('Authentication required to load events.');
        return;
      }

      const { data } = await axios.get(`${API_URL}/api/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents(data.events || []);
    } catch (err: unknown) {
      console.error('Error fetching events:', err);
      const message = err instanceof Error ? err.message : 'Failed to load events';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  const updateEventStatus = useCallback(
    async (eventId: string, status: EventStatus) => {
      try {
        setActionLoading(eventId);
        const token = await currentUser?.getIdToken();
        if (!token) return;

        await axios.patch(
          `${API_URL}/api/events/${eventId}/status`,
          { status },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

        setEvents((prev) =>
          prev.map((event) =>
            event._id === eventId ? { ...event, status } : event,
          ),
        );
      } catch (err: unknown) {
        console.error('Error updating status:', err);
        const message = err instanceof Error ? err.message : 'Failed to update status';
        alert(`Failed to update status: ${message}`);
      } finally {
        setActionLoading(null);
      }
    },
    [currentUser],
  );

  const deleteEvent = useCallback(
    async (eventId: string) => {
      try {
        setActionLoading(eventId);
        const token = await currentUser?.getIdToken();
        if (!token) return;

        await axios.delete(`${API_URL}/api/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEvents((prev) => prev.filter((event) => event._id !== eventId));
      } catch (err: unknown) {
        console.error('Error deleting event:', err);
        const message = err instanceof Error ? err.message : 'Failed to delete event';
        alert(`Failed to delete event: ${message}`);
      } finally {
        setActionLoading(null);
      }
    },
    [currentUser],
  );

  return {
    events,
    loading,
    error,
    actionLoading,
    fetchEvents,
    updateEventStatus,
    deleteEvent,
  };
};
