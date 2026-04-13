import React, { useMemo, useEffect, useState } from 'react';
import type { EventStatus } from '../types';
import ConfirmDialog from '../../components/layout/confirm-dialog';
import { useEventManagement } from '../hooks/useEventManagement';
import EventsHeader from '../components/events/EventsHeader';
import EventsStatusTabs from '../components/events/EventsStatusTabs';
import EventsTable from '../components/events/EventsTable';

const STATUS_META: Record<EventStatus, { label: string; tone: string }> = {
  new_request: { label: 'New Request', tone: 'bg-amber-50 text-amber-700 border-amber-100' },
  active: { label: 'Active', tone: 'bg-teal-50 text-teal-700 border-teal-100' },
  completed: { label: 'Completed', tone: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  cancelled: { label: 'Cancelled', tone: 'bg-slate-100 text-slate-600 border-slate-200' },
};

const STATUS_TABS: { key: EventStatus; label: string }[] = [
  { key: 'new_request', label: 'Requests' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled / No Response' },
];

const EventsView: React.FC = () => {
  const { events, loading, error, actionLoading, fetchEvents, updateEventStatus, deleteEvent } = useEventManagement();
  const [activeStatus, setActiveStatus] = useState<EventStatus>('new_request');
  const [searchTerm, setSearchTerm] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingEventId, setPendingEventId] = useState<string | null>(null);
  const [pendingStatus, setPendingStatus] = useState<EventStatus | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [messageContent, setMessageContent] = useState<string>('');

  const requestStatusChange = (eventId: string, status: EventStatus) => {
    setPendingEventId(eventId);
    setPendingStatus(status);
    setIsConfirmOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!pendingEventId || !pendingStatus) return;
    await updateEventStatus(pendingEventId, pendingStatus);
    setIsConfirmOpen(false);
    setPendingEventId(null);
    setPendingStatus(null);
  };

  const handleCancelStatusChange = () => {
    setIsConfirmOpen(false);
    setPendingEventId(null);
    setPendingStatus(null);
  };

  const requestDelete = (eventId: string) => {
    setPendingDeleteId(eventId);
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;
    await deleteEvent(pendingDeleteId);
    setIsDeleteConfirmOpen(false);
    setPendingDeleteId(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setPendingDeleteId(null);
  };

  const handleOpenMessage = (eventId: string) => {
    const selected = events.find((event) => event._id === eventId);
    setMessageContent(selected?.message || 'No message provided.');
    setIsMessageOpen(true);
  };

  const handleCloseMessage = () => {
    setIsMessageOpen(false);
    setMessageContent('');
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const grouped = useMemo(() => {
    return {
      new_request: events.filter((e) => e.status === 'new_request'),
      active: events.filter((e) => e.status === 'active'),
      completed: events.filter((e) => e.status === 'completed'),
      cancelled: events.filter((e) => e.status === 'cancelled'),
    };
  }, [events]);

  const filteredRows = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const base = grouped[activeStatus] || [];
    if (!term) return base;
    return base.filter((event) =>
      [
        event.firstName,
        event.lastName,
        event.email,
        event.company,
        event.service,
        event.message,
      ]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(term)),
    );
  }, [grouped, activeStatus, searchTerm]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-none">
      <EventsHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="bg-slate-50/60 rounded-3xl border border-slate-100 p-4 md:p-6 w-full max-w-none flex flex-col">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          <EventsStatusTabs
            activeStatus={activeStatus}
            onChange={setActiveStatus}
            statusTabs={STATUS_TABS}
            counts={{
              new_request: grouped.new_request.length,
              active: grouped.active.length,
              completed: grouped.completed.length,
              cancelled: grouped.cancelled.length,
            }}
          />

          <EventsTable
            rows={filteredRows}
            activeStatusLabel={STATUS_META[activeStatus].label}
            statusTone={STATUS_META[activeStatus].tone}
            onRefresh={fetchEvents}
            onStatusChange={requestStatusChange}
            onDelete={requestDelete}
            onMessage={handleOpenMessage}
            loading={loading}
            error={error}
            actionLoading={actionLoading}
          />
        </div>
      </div>

      <ConfirmDialog
        open={isConfirmOpen}
        title="Change event status?"
        message="This will move the request to a different status."
        confirmLabel="Yes, update"
        cancelLabel="No, keep"
        onConfirm={handleConfirmStatusChange}
        onCancel={handleCancelStatusChange}
        isLoading={Boolean(actionLoading)}
      />

      <ConfirmDialog
        open={isDeleteConfirmOpen}
        title="Delete event?"
        message="This will permanently delete the event."
        confirmLabel="Yes, delete"
        cancelLabel="No, keep"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={Boolean(actionLoading)}
      />

      <ConfirmDialog
        open={isMessageOpen}
        title="Client Message"
        message={messageContent}
        confirmLabel="Close"
        hideCancel={true}
        onConfirm={handleCloseMessage}
        onCancel={handleCloseMessage}
        isLoading={false}
      />
    </div>
  );
};

export default EventsView;
