import React from 'react';
import type { BackendService } from '../../types';
import { ICONS } from '../../constants';

interface ServiceListProps {
  services: BackendService[];
  isLoading: boolean;
  onEdit: (service: BackendService) => void;
  onDelete: (id: number) => void;
}

export const ServiceList: React.FC<ServiceListProps> = ({
  services,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading && services.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
        <p className="text-slate-500">No services found. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all group flex flex-row items-center gap-4 p-4"
        >
          <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-4 flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex-shrink-0">Title:</span>
              <h3
                className="text-sm font-bold text-slate-800 group-hover:text-teal-600 transition-colors truncate"
                title={service.title}
              >
                {service.title}
              </h3>
            </div>

            <div className="md:col-span-3 flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex-shrink-0">Slug:</span>
              <p className="text-sm text-slate-600 truncate" title={service.slug}>
                {service.slug}
              </p>
            </div>

            <div className="md:col-span-2 flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex-shrink-0">Status:</span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  service.status === 'published'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                {service.status || 'draft'}
              </span>
            </div>

            <div className="md:col-span-3 flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex-shrink-0">Featured:</span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  service.featured ? 'bg-teal-50 text-teal-700' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {service.featured ? 'Yes' : 'No'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => onEdit(service)}
              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-colors"
            >
              <ICONS.FileText size={14} /> Edit
            </button>
            <button
              onClick={() => onDelete(service.id)}
              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <ICONS.X size={14} /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
