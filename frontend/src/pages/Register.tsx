import React, { useState } from 'react';
import { useNavigate,  } from 'react-router-dom';
import { api } from '../api/client.js';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '', role: 'CANDIDATE', companyName: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      navigate('/login');
    } catch {
      setError('Registration transaction dropped. Target email parameter likely occupied.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 border border-slate-100">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight text-center mb-6">Create Base Space</h2>
        {error && <div className="p-3 mb-4 text-sm bg-rose-50 text-rose-600 rounded-md font-medium border border-rose-200">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">First Name</label>
              <input type="text" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-indigo-500 text-slate-900" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Last Name</label>
              <input type="text" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-indigo-500 text-slate-900" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-indigo-500 text-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Password</label>
            <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-indigo-500 text-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Functional Account Core Role</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-3 py-2 rounded border bg-white focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium">
              <option value="CANDIDATE">Job Seeker / Candidate Profile</option>
              <option value="RECRUITER">Talent Acquisition / Corporate Recruiter</option>
            </select>
          </div>
          {form.role === 'RECRUITER' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Corporate Entity Name</label>
              <input type="text" required value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-indigo-500 text-slate-900" />
            </div>
          )}
          <button type="submit" className="w-full py-3 mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded shadow transition">Complete Provisioning</button>
        </form>
      </div>
    </div>
  );
};
