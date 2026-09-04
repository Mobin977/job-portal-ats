import React, { useState, useEffect } from 'react';
import { Check, X, PlusCircle } from 'lucide-react';
import { api } from '../api/client.js';
import type { ApplicationEntry } from '../@types/auth.js';

export const RecruiterDashboard: React.FC = () => {
  const [apps, setApps] = useState<ApplicationEntry[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', description: '', requirements: '', location: '', salaryRange: '' });

  const fetchApps = async () => {
    const res = await api.get('/applications/recruiter-dashboard');
    setApps(res.data);
  };

  useEffect(() => { fetchApps(); }, []);

  const handleStatusChange = async (id: string, status: string) => {
    await api.patch(`/applications/${id}/status`, { status });
    fetchApps();
  };

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...newJob, requirements: newJob.requirements.split(',').map((s) => s.trim()) };
    await api.post('/jobs', payload);
    setShowModal(false);
    setNewJob({ title: '', description: '', requirements: '', location: '', salaryRange: '' });
    alert('Operational posting distributed cleanly!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 min-h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Talent Acquisition Desk</h1>
          <p className="text-xs font-medium text-slate-500 mt-1">Review applicant lists ordered strictly by parsed compliance metrics.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-sm font-bold shadow transition">
          <PlusCircle className="h-4 w-4" /> Issue Job Opening
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-slate-300 text-xs font-bold uppercase tracking-wider">
              <th className="p-4">Candidate Profile</th>
              <th className="p-4">Target Role</th>
              <th className="p-4 text-center">ATS Match Score</th>
              <th className="p-4">Current Pipeline Phase</th>
              <th className="p-4 text-right">Intervention Core</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {apps.map((app) => (
              <tr key={app.id} className="hover:bg-slate-50 font-medium">
                <td className="p-4">
                  <div className="text-slate-900 font-bold">{app.candidate.user.firstName} {app.candidate.user.lastName}</div>
                  <div className="text-slate-500 text-xs">{app.candidate.user.email}</div>
                </td>
                <td className="p-4 text-slate-700 font-semibold">{app.job.title}</td>
                <td className="p-4 text-center">
                  <span className={`inline-block font-extrabold text-xs px-2.5 py-1 rounded-full ${app.atsScore >= 75 ? 'bg-emerald-100 text-emerald-800' : app.atsScore >= 40 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}`}>
                    {app.atsScore}% Profile Fit
                  </span>
                </td>
                <td className="p-4"><span className="text-xs bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold">{app.status}</span></td>
                <td className="p-4 text-right flex items-center justify-end gap-2">
                  <button onClick={() => handleStatusChange(app.id, 'INTERVIEW')} className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-md border border-emerald-200" title="Progress to Interview"><Check className="h-4 w-4" /></button>
                  <button onClick={() => handleStatusChange(app.id, 'REJECTED')} className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-md border border-rose-200" title="Reject File Entry"><X className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-6 space-y-4 border border-slate-100">
            <h2 className="text-xl font-black text-slate-900">Distribute New Vacancy Layout Profile</h2>
            <form onSubmit={handlePostJob} className="space-y-4 text-xs font-semibold text-slate-700">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block mb-1">Job Title</label><input type="text" required value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} className="w-full p-2 border rounded text-slate-900 font-medium" /></div>
                <div><label className="block mb-1">Target Location</label><input type="text" required value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} className="w-full p-2 border rounded text-slate-900 font-medium" /></div>
              </div>
              <div><label className="block mb-1">Core Required Skills (Comma-Separated Array Strings)</label><input type="text" required placeholder="React, Node.js, TypeScript, PostgreSQL" value={newJob.requirements} onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })} className="w-full p-2 border rounded text-slate-900 font-medium" /></div>
              <div><label className="block mb-1">Target Salary Budget Range</label><input type="text" placeholder="$110k - $140k" value={newJob.salaryRange} onChange={(e) => setNewJob({ ...newJob, salaryRange: e.target.value })} className="w-full p-2 border rounded text-slate-900 font-medium" /></div>
              <div><label className="block mb-1">Detailed Requirements Description</label><textarea required rows={4} value={newJob.description} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })} className="w-full p-2 border rounded text-slate-900 font-medium text-xs tracking-wide" /></div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-bold text-sm">Drop Workspace</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-bold text-sm shadow">Deploy Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
