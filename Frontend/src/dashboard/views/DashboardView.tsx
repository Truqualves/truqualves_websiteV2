
import React, { useMemo } from 'react';
import { KPISection } from '../components/KPISection';
import { ChartsSection } from '../components/ChartsSection';
import { ActivityTable } from '../components/ActivityTable';
import { ICONS } from '../constants';
import { useEventSummary } from '../hooks/useEventSummary';

const DashboardView: React.FC = () => {
  const { totals, events, loading, error } = useEventSummary();

  const kpis = useMemo(() => {
    const total = totals.total;
    const completed = totals.completed;
    const complianceScore = totals.complianceScore;

    return [
      { label: 'Total Validations', value: total, change: 0, trend: 'neutral' as const, icon: 'CheckCircle' },
      { label: 'Active Clients', value: totals.active, change: 0, trend: 'neutral' as const, icon: 'Users' },
      { label: 'Compliance Score', value: `${complianceScore}%`, change: 0, trend: 'neutral' as const, icon: 'ShieldAlert' },
      { label: 'Open Audits', value: Math.max(total - completed, 0), change: 0, trend: 'neutral' as const, icon: 'Activity' }
    ];
  }, [totals]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Compliance Overview</h2>
          <p className="text-slate-500 text-sm font-medium">Real-time status of validation projects and audit readiness.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
            Download Report
          </button>
          <button className="bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-all shadow-md shadow-teal-500/20 flex items-center gap-2">
            <ICONS.Plus size={18} /> New Validation
          </button>
        </div>
      </div>

      <KPISection kpis={kpis} />
      <ChartsSection />
      <ActivityTable events={events} loading={loading} error={error} />
      
      {/* Bottom spacer */}
      <div className="h-10"></div>
    </div>
  );
};

export default DashboardView;
