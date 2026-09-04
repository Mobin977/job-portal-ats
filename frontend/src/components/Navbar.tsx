import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const userJson = localStorage.getItem('ats_user_profile');
  const user = userJson ? JSON.parse(userJson) : null;

  const handleLogout = () => {
    localStorage.removeItem('ats_auth_token');
    localStorage.removeItem('ats_user_profile');
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-indigo-400">
          <Briefcase className="h-6 w-6" /> TalentForge <span className="text-xs bg-indigo-900 text-indigo-200 px-2 py-0.5 rounded">ATS</span>
        </Link>
        <div className="flex items-center gap-6">
          {user ? (
            <>
              {user.role === 'CANDIDATE' && <Link to="/" className="hover:text-indigo-400 text-sm font-medium">Find Jobs</Link>}
              {user.role === 'RECRUITER' && <Link to="/recruiter" className="hover:text-indigo-400 text-sm font-medium">Recruiter Desk</Link>}
              {user.role === 'ADMIN' && <Link to="/analytics" className="hover:text-indigo-400 text-sm font-medium">Platform Analytics</Link>}
              <span className="text-xs text-slate-400">Hi, {user.firstName}</span>
              <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm font-medium text-rose-400 hover:text-rose-300">
                <LogOut className="h-4 w-4" /> Exit
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-400 text-sm font-medium">Sign In</Link>
              <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-md transition">Join Now</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
