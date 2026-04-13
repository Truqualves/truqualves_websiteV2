
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { COMPLIANCE_TREND_DATA, DISTRIBUTION_DATA } from '../constants';

export const ChartsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
      {/* Line Chart */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg text-slate-800">Compliance Trend</h3>
          <select className="bg-slate-50 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg px-2 py-1 outline-none">
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={COMPLIANCE_TREND_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 12, fill: '#64748b'}}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 12, fill: '#64748b'}}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#0d9488" 
                strokeWidth={3} 
                dot={{r: 4, fill: '#0d9488', strokeWidth: 2, stroke: '#fff'}}
                activeDot={{r: 6}}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#94a3b8" 
                strokeWidth={2} 
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-lg text-slate-800 mb-6">Validation Status</h3>
        <div className="h-72 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DISTRIBUTION_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {DISTRIBUTION_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" align="center" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
             <span className="text-2xl font-bold text-slate-800">1,000</span>
             <span className="text-xs text-slate-500 font-medium">Total Systems</span>
          </div>
        </div>
      </div>
    </div>
  );
};
