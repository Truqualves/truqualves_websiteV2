
import React, { useMemo } from 'react';
import { ICONS } from '../constants';
import type { BackendEvent } from '../types';

interface ActivityTableProps {
  events: BackendEvent[];
  loading: boolean;
  error: string;
}

export const ActivityTable: React.FC<ActivityTableProps> = ({ events, loading, error }) => {
  const recentEvents = useMemo(() => events.slice(0, 5), [events]);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-lg text-slate-800">Recent Activity</h3>
        <button className="text-teal-600 text-sm font-semibold hover:underline flex items-center gap-1">
          View All <ICONS.ArrowUpRight size={14} />
        </button>
      </div>
      <div className="overflow-x-auto no-scrollbar touch-pan-x">
        <table className="w-full text-left min-w-[600px]">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Service</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-400 text-sm">
                  Loading activity...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-rose-500 text-sm">
                  {error}
                </td>
              </tr>
            ) : recentEvents.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-400 text-sm">
                  No recent activity found.
                </td>
              </tr>
            ) : (
              recentEvents.map((event) => (
                <tr key={event._id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 text-[10px] flex items-center justify-center font-bold shrink-0">
                        {(event.firstName?.[0] || 'U') + (event.lastName?.[0] || 'S')}
                      </div>
                      <span className="text-sm text-slate-600 whitespace-nowrap">
                        {event.firstName} {event.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{event.service}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{event.company}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      {new Date(event.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={event.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3 bg-slate-50/50 border-t border-slate-100 text-[10px] text-slate-400 font-medium sm:hidden">
        Scroll horizontally to view more details
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const styles: Record<string, string> = {
    new_request: 'bg-amber-50 text-amber-600',
    active: 'bg-teal-50 text-teal-600',
    completed: 'bg-emerald-50 text-emerald-600',
    cancelled: 'bg-slate-100 text-slate-600'
  };

  const label = status.replace('_', ' ');
 
  return (
    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${styles[status] || styles.active}`}>
      {label}
    </span>
  );
};
