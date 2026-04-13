import React from 'react';
import { ICONS } from '../../constants';

interface EventsHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const EventsHeader: React.FC<EventsHeaderProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Client Event Stages</h2>
        <p className="text-slate-500 text-sm font-medium">
          Manage incoming requests and track their status.
        </p>
      </div>
      <div className="relative w-full md:w-72">
        <ICONS.Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search here"
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
        />
      </div>
    </div>
  );
};

export default EventsHeader;
