import React, { useEffect, useMemo, useState } from 'react';
import { Editor } from 'primereact/editor';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNewsletterManagement } from '../hooks/useNewsletterManagement';
import ConfirmDialog from '../../components/layout/confirm-dialog';

import 'quill/dist/quill.snow.css';

const NewsletterView: React.FC = () => {
  const {
    subscribers,
    loading,
    error,
    sending,
    deletingId,
    fetchSubscribers,
    sendNewsletter,
    deleteSubscriber,
  } = useNewsletterManagement();

  const [sendMode, setSendMode] = useState<'all' | 'selected'>('all');
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [bodyHtml, setBodyHtml] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  const subscribedEmails = useMemo(
    () =>
      subscribers
        .filter((subscriber) => subscriber.status === 'subscribed')
        .map((subscriber) => subscriber.email),
    [subscribers],
  );

  const filteredSubscribers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return subscribers;
    return subscribers.filter((subscriber) =>
      subscriber.email.toLowerCase().includes(term),
    );
  }, [subscribers, searchTerm]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject.trim()) {
      toast.error('Subject is required');
      return;
    }

    const plainText = bodyHtml.replace(/<[^>]*>/g, '').trim();
    if (!plainText) {
      toast.error('Body is required');
      return;
    }

    if (sendMode === 'selected' && selectedEmails.length === 0) {
      toast.error('Select at least one recipient');
      return;
    }

    try {
      const response = await sendNewsletter({
        sendMode,
        recipientEmails: sendMode === 'selected' ? selectedEmails : undefined,
        subject: subject.trim(),
        bodyHtml,
      });

      toast.success(response?.message || 'Newsletter sent successfully');
      setSubject('');
      setBodyHtml('');
      setSelectedEmails([]);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        (err instanceof Error ? err.message : 'Failed to send newsletter');
      toast.error(message);
    }
  };

  const requestDelete = (subscriberId: string) => {
    setPendingDeleteId(subscriberId);
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;
    try {
      await deleteSubscriber(pendingDeleteId);
      toast.success('Subscriber deleted successfully');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        (err instanceof Error ? err.message : 'Failed to delete subscriber');
      toast.error(message);
    } finally {
      setIsDeleteConfirmOpen(false);
      setPendingDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    if (deletingId) return;
    setIsDeleteConfirmOpen(false);
    setPendingDeleteId(null);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-none">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Newsletter Dashboard</h2>
          <p className="text-slate-500 text-sm font-medium">
            Send updates to all subscribed users or selected recipients.
          </p>
        </div>
      </div>

      <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Compose Email</h3>

          <form onSubmit={handleSend} className="space-y-5">
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">Send Mode</p>
              <div className="flex flex-wrap gap-3">
                <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="radio"
                    name="sendMode"
                    checked={sendMode === 'all'}
                    onChange={() => setSendMode('all')}
                  />
                  Send to all subscribed
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="radio"
                    name="sendMode"
                    checked={sendMode === 'selected'}
                    onChange={() => setSendMode('selected')}
                  />
                  Select recipients
                </label>
              </div>
            </div>

            {sendMode === 'selected' ? (
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">
                  Email IDs ({selectedEmails.length} selected)
                </p>
                <select
                  value={selectedEmails[0] || ''}
                  onChange={(e) =>
                    setSelectedEmails(e.target.value ? [e.target.value] : [])
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-sm font-semibold text-slate-700"
                  disabled={subscribedEmails.length === 0}
                >
                  <option value="" disabled>
                    {subscribedEmails.length === 0 ? 'No subscribed emails found' : 'Select recipient'}
                  </option>
                  {subscribedEmails.map((email) => (
                    <option key={email} value={email}>
                      {email}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter newsletter subject"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Body</label>
              <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
                <Editor
                  value={bodyHtml}
                  onTextChange={(e) => setBodyHtml(e.htmlValue || '')}
                  style={{ height: '320px' }}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-teal-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-all shadow-md shadow-teal-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={sending}
              >
                {sending ? 'Sending...' : 'Send Newsletter'}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="text-lg font-bold text-slate-800">Subscribers</h3>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full border bg-teal-50 text-teal-700 border-teal-100">
              {subscribers.length} total
            </span>
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search email..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 mb-4"
          />

          {loading ? <p className="text-sm text-slate-500">Loading subscribers...</p> : null}
          {!loading && error ? <p className="text-sm text-red-600">{error}</p> : null}

          {!loading && !error ? (
            <div className="overflow-auto rounded-xl border border-slate-100">
              <table className="min-w-full">
                <thead className="bg-slate-50">
                  <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Subscribed On</th>
                    <th className="px-4 py-3">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSubscribers.map((subscriber) => (
                    <tr key={subscriber._id}>
                      <td className="px-4 py-3 text-sm text-slate-700">{subscriber.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full border ${
                            subscriber.status === 'subscribed'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {subscriber.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {new Date(subscriber.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => requestDelete(subscriber._id)}
                          className="inline-flex items-center justify-center p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                          disabled={deletingId === subscriber._id}
                          title="Delete"
                          aria-label="Delete subscriber"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>

      <ConfirmDialog
        open={isDeleteConfirmOpen}
        title="Delete subscriber?"
        message="This will permanently delete the subscriber record."
        confirmLabel="Yes, delete"
        cancelLabel="No, keep"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={Boolean(deletingId)}
      />
    </div>
  );
};

export default NewsletterView;
