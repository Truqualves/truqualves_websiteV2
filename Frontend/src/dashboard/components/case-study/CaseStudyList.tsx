import React from 'react';
import type { BackendCaseStudy } from '../../types';
import { ICONS } from '../../constants';

interface CaseStudyListProps {
  caseStudies: BackendCaseStudy[];
  isLoading: boolean;
  onEdit: (caseStudy: BackendCaseStudy) => void;
  onDelete: (id: string) => void;
}

export const CaseStudyList: React.FC<CaseStudyListProps> = ({
  caseStudies,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading && caseStudies.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (caseStudies.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
        <p className="text-slate-500">No case studies found. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {caseStudies.map((caseStudy) => (
        <div
          key={caseStudy._id}
          className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all group flex flex-row items-center gap-4 p-4"
        >
          <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-4 flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex-shrink-0">Title:</span>
              <h3
                className="text-sm font-bold text-slate-800 group-hover:text-teal-600 transition-colors truncate"
                title={caseStudy.title}
              >
                {caseStudy.title}
              </h3>
            </div>

            <div className="md:col-span-4 flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex-shrink-0">Tag:</span>
              <p className="text-sm text-slate-600 truncate" title={caseStudy.tag}>
                {caseStudy.tag}
              </p>
            </div>

            <div className="md:col-span-4 flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex-shrink-0">Industry:</span>
              <p className="text-sm text-slate-600 truncate" title={caseStudy.industry}>
                {caseStudy.industry}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => onEdit(caseStudy)}
              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-colors"
            >
              <ICONS.FileText size={14} /> Edit
            </button>
            <button
              onClick={() => onDelete(caseStudy._id)}
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
