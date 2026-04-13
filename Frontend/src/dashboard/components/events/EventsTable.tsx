import React from 'react';
import { ICONS } from '../../constants';
import type { BackendEvent, EventStatus } from '../../types';
import { EVENT_STATUS_OPTIONS } from '../../types';

interface EventsTableProps {
  rows: BackendEvent[];
  activeStatusLabel: string;
  statusTone: string;
  onRefresh: () => void;
  onStatusChange: (eventId: string, status: EventStatus) => void;
  onDelete: (eventId: string) => void;
  onMessage: (eventId: string) => void;
  loading: boolean;
  error: string;
  actionLoading: string | null;
}

const EventsTable: React.FC<EventsTableProps> = ({
  rows,
  activeStatusLabel,
  statusTone,
  onRefresh,
  onStatusChange,
  onDelete,
  onMessage,
  loading,
  error,
  actionLoading,
}) => {
  return (
    <section className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden w-full h-full">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusTone}`}>
            {activeStatusLabel}
          </span>
          <p className="text-sm text-slate-500">{rows.length} requests</p>
        </div>
        <button
          onClick={onRefresh}
          className="text-slate-500 hover:text-slate-700 text-sm font-semibold"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-52 text-slate-500 text-sm gap-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
            <ICONS.Activity size={22} />
          </div>
          Loading events...
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-600 m-6">
          <div className="mx-auto mb-3 w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-500">
            <ICONS.HelpCircle size={22} />
          </div>
          <p className="text-sm">{error}</p>
          <button
            onClick={onRefresh}
            className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : rows.length === 0 ? (
        <div className="px-6 py-12 text-center text-slate-400 text-sm">
          <div className="mx-auto mb-3 w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
            <ICONS.Search size={22} />
          </div>
          No requests in this status.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-slate-400 border-b border-slate-100">
                <th className="px-6 py-3 font-semibold">ID</th>
                <th className="px-6 py-3 font-semibold">Name</th>
                <th className="px-6 py-3 font-semibold">Contact</th>
                <th className="px-6 py-3 font-semibold">Service</th>
                <th className="px-6 py-3 font-semibold">Company</th>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold text-center">Message</th>
                <th className="px-6 py-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {rows.map((event) => (
                <tr key={event._id} className="hover:bg-slate-50/60">
                  <td className="px-6 py-4 text-slate-400 font-semibold">
                    {event._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-6 py-4 text-slate-700 font-semibold">
                    {event.firstName} {event.lastName}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-600">{event.email}</div>
                    <div className="text-xs text-slate-400">{event.phone || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{event.service}</td>
                  <td className="px-6 py-4 text-slate-600">{event.company}</td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(event.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      <select
                        value={event.status}
                        onChange={(e) => onStatusChange(event._id, e.target.value as EventStatus)}
                        disabled={actionLoading === event._id}
                        className="bg-transparent text-xs font-semibold text-slate-500 focus:outline-none"
                      >
                        {EVENT_STATUS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => onMessage(event._id)}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:bg-slate-100"
                      title="View message"
                    >
                      <ICONS.MessageSquare size={18} />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-rose-500 hover:bg-rose-50"
                      title="Delete"
                      disabled={actionLoading === event._id}
                      onClick={() => onDelete(event._id)}
                    >
                      <ICONS.Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="px-6 py-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center md:justify-end gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          Rows per page:
          <span className="text-slate-600 font-semibold">10</span>
        </div>
        <div className="flex items-center gap-3">
          <span>
            {rows.length === 0 ? '0-0' : `1-${rows.length}`} of {rows.length}
          </span>
          <div className="flex items-center gap-1 text-slate-300">
            <button type="button" className="p-1 rounded hover:text-slate-500">{'<'}</button>
            <button type="button" className="p-1 rounded hover:text-slate-500">{'>'}</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsTable;
