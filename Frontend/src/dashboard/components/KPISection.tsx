
import React from 'react';
import { KPIS, ICONS } from '../constants';
import type { KPI } from '../types';

interface KPISectionProps {
  kpis?: KPI[];
}

export const KPISection: React.FC<KPISectionProps> = ({ kpis = KPIS }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi) => {
        const Icon = ICONS[kpi.icon as keyof typeof ICONS] || ICONS.Activity;
        const isUp = kpi.trend === 'up';
        
        return (
          <div key={kpi.label} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-teal-50 transition-colors">
                <Icon size={24} className="text-slate-600 group-hover:text-teal-600 transition-colors" />
              </div>
              <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${
                isUp ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
              }`}>
                {isUp ? <ICONS.ArrowUpRight size={14} className="mr-1" /> : <ICONS.ArrowDownRight size={14} className="mr-1" />}
                {kpi.change}%
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{kpi.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{kpi.value}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};
