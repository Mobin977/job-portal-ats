import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar.js';
import { ProtectedRoute } from './components/ProtectedRoute.js';
import { Login } from './pages/Login.js';
import { Register } from './pages/Register.js';
import { JobSearch } from './pages/JobSearch.js';
import { RecruiterDashboard } from './pages/RecruiterDashboard.js';
import { AdminAnalytics } from './pages/AdminAnalytics.js';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 font-sans antialiased selection:bg-indigo-500 selection:text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute allowedRoles={['CANDIDATE']} />}>
              <Route path="/" element={<JobSearch />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['RECRUITER', 'ADMIN']} />}>
              <Route path="/recruiter" element={<RecruiterDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="/analytics" element={<AdminAnalytics />} />
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};
