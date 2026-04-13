import { useCallback, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context';
import type { BackendNewsletterSubscriber } from '../types';

const API_URL = import.meta.env.VITE_BACKEND_URL;

type SendMode = 'all' | 'selected';

export const useNewsletterManagement = () => {
  const { currentUser } = useAuth();
  const [subscribers, setSubscribers] = useState<BackendNewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const getToken = useCallback(async () => {
    const token = await currentUser?.getIdToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    return token;
  }, [currentUser]);

  const fetchSubscribers = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const token = await getToken();

      const { data } = await axios.get(`${API_URL}/api/newsletter`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSubscribers(data.subscribers || []);
    } catch (err: unknown) {
      console.error('Error fetching newsletter subscribers:', err);
      setError(err instanceof Error ? err.message : 'Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  const sendNewsletter = useCallback(
    async (payload: {
      sendMode: SendMode;
      recipientEmails?: string[];
      subject: string;
      bodyHtml: string;
    }) => {
      try {
        setSending(true);
        const token = await getToken();
        const { data } = await axios.post(`${API_URL}/api/newsletter/send`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        return data;
      } finally {
        setSending(false);
      }
    },
    [getToken],
  );

  const deleteSubscriber = useCallback(
    async (subscriberId: string) => {
      try {
        setDeletingId(subscriberId);
        const token = await getToken();
        await axios.delete(`${API_URL}/api/newsletter/${subscriberId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSubscribers((prev) =>
          prev.filter((subscriber) => subscriber._id !== subscriberId),
        );
      } finally {
        setDeletingId(null);
      }
    },
    [getToken],
  );

  return {
    subscribers,
    loading,
    error,
    sending,
    deletingId,
    fetchSubscribers,
    sendNewsletter,
    deleteSubscriber,
  };
};
