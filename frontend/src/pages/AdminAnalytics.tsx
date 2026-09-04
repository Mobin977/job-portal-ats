import React, { useState, useEffect } from 'react';
import { BarChart3, Database, Layers } from 'lucide-react';
import { api } from '../api/client.js';

interface MetricState {
  totalJobs: number;
  totalApplications: number;
  statusDistribution: { status: string; count: number }[];
}

export const AdminAnalytics: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricState | null>(null);

  useEffect(() => {
    api.get('/analytics/metrics').then((res) => setMetrics(res.data));
  }, []);

  if (!metrics) return <div className="text-center py-20 font-bold text-slate-500 text-sm">Computing platform analytics engine logs...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 min-h-[calc(100vh-4rem)]">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Performance Monitor</h1>
        <p className="text-xs font-medium text-slate-500 mt-1">Real-time global metrics across all registered user spaces and pipeline metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-md flex items-center gap-5">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl"><Database className="h-8 w-8" /></div>
          <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Role Postings Indexed</p><h3 className="text-4xl font-black text-slate-900 mt-1">{metrics.totalJobs}</h3></div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-md flex items-center gap-5">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl"><Layers className="h-8 w-8" /></div>
          <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Active Pipeline Transmissions</p><h3 className="text-4xl font-black text-slate-900 mt-1">{metrics.totalApplications}</h3></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 space-y-6">
        <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2"><BarChart3 className="h-5 w-5 text-indigo-500" /> Tracking Stage Vector Distributions</h3>
        <div className="space-y-4">
          {metrics.statusDistribution.map((dist, idx) => {
            const pct = Math.round((dist.count / metrics.totalApplications) * 100) || 0;
            return (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-bold text-slate-700">
                  <span className="uppercase tracking-wider text-xs">{dist.status}</span>
                  <span>{dist.count} File Records ({pct}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div style={{ width: `${pct}%` }} className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full transition-all duration-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
