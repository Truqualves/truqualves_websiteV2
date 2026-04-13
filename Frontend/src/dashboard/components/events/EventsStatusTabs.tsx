import React from 'react';
import type { EventStatus } from '../../types';

interface EventsStatusTabsProps {
  activeStatus: EventStatus;
  onChange: (status: EventStatus) => void;
  statusTabs: { key: EventStatus; label: string }[];
  counts: Record<EventStatus, number>;
}

const EventsStatusTabs: React.FC<EventsStatusTabsProps> = ({
  activeStatus,
  onChange,
  statusTabs,
  counts,
}) => {
  return (
    <aside className="w-full lg:w-56 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 shrink-0 h-full">
      {statusTabs.map((tab) => {
        const isActive = activeStatus === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`w-full flex items-center justify-between gap-4 rounded-2xl px-4 py-4 text-sm font-semibold transition-all ${
              isActive
                ? 'bg-slate-50 text-slate-900 border border-slate-200 shadow-sm'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-3">
              <span className={`h-3 w-3 rounded-full ${isActive ? 'bg-teal-500' : 'bg-slate-300'}`} />
              <span className="text-left">{tab.label}</span>
            </span>
            <span className="inline-flex items-center justify-center min-w-7 px-2.5 py-1.5 rounded-full text-xs bg-slate-100 text-slate-600">
              {counts[tab.key] ?? 0}
            </span>
          </button>
        );
      })}
    </aside>
  );
};

export default EventsStatusTabs;
