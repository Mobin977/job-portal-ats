import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/client.js';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('ats_auth_token', res.data.token);
      localStorage.setItem('ats_user_profile', JSON.stringify(res.data.user));
      
      if (res.data.user.role === 'RECRUITER') navigate('/recruiter');
      else if (res.data.user.role === 'ADMIN') navigate('/analytics');
      else navigate('/');
    } catch {
      setError('Invalid username credential profile or password match.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 border border-slate-100">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight text-center mb-2">Welcome Back</h2>
        <p className="text-sm text-slate-500 text-center mb-6">Enter your credentials to manage your pipeline metrics.</p>
        {error && <div className="p-3 mb-4 text-sm bg-rose-50 border border-rose-200 text-rose-600 rounded-md font-medium">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Corporate Mail</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Security Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900" />
          </div>
          <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md shadow transition">Authenticate Profile</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">New to the platform? <Link to="/register" className="text-indigo-600 hover:underline font-medium">Create workspace</Link></p>
      </div>
    </div>
  );
};
