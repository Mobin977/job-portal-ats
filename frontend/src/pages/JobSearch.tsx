import React, { useState, useEffect } from 'react';
import { MapPin, Building, Search, UploadCloud, CheckCircle } from 'lucide-react';
import { api } from '../api/client.js';
import type { JobPosting } from '../@types/auth.js';

export const JobSearch: React.FC = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);

  const fetchJobs = async () => {
    const res = await api.get('/jobs', { params: { search, location } });
    setJobs(res.data);
    if (res.data.length > 0 && !selectedJob) setSelectedJob(res.data[0]);
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !selectedJob) return;

    const formData = new FormData();
    formData.append('resume', file);

    try {
      await api.post(`/applications/apply/${selectedJob.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess(true);
      setFile(null);
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      alert('You have already applied for this opening or file stream is invalid.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[calc(100vh-4rem)]">
      <div className="md:col-span-1 space-y-6">
        <div className="bg-white p-5 rounded-xl shadow-md space-y-4 border border-slate-100">
          <h3 className="font-bold text-lg text-slate-900">Query Workspace Filters</h3>
          <div className="space-y-3">
            <div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><input type="text" placeholder="Title keywords..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border rounded focus:ring-2 focus:ring-indigo-500 text-sm" /></div>
            <div className="relative"><MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><input type="text" placeholder="Location matrix..." value={location} onChange={(e) => setLocation(e.target.value)} className="w-full pl-9 pr-4 py-2 border rounded focus:ring-2 focus:ring-indigo-500 text-sm" /></div>
            <button onClick={fetchJobs} className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-sm font-semibold shadow">Run Search</button>
          </div>
        </div>
        <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-2">
          {jobs.map((job) => (
            <div key={job.id} onClick={() => { setSelectedJob(job); }} className={`p-4 rounded-xl border cursor-pointer transition shadow-sm ${selectedJob?.id === job.id ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
              <h4 className="font-bold text-slate-900 text-base mb-1">{job.title}</h4>
              <div className="flex items-center gap-1 text-slate-600 text-xs font-medium mb-2"><Building className="h-3.5 w-3.5" /> {job.recruiter.companyName}</div>
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
                {job.salaryRange && <span className="text-emerald-600 font-semibold">{job.salaryRange}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="md:col-span-2">
        {selectedJob ? (
          <div className="bg-white rounded-xl shadow-md border border-slate-100 p-8 h-full flex flex-col justify-between">
            <div>
              <div className="border-b pb-6 mb-6">
                <h2 className="text-2xl font-black text-slate-900 mb-2">{selectedJob.title}</h2>
                <p className="text-sm font-bold text-indigo-600 mb-4">{selectedJob.recruiter.companyName} • {selectedJob.location}</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedJob.requirements.map((req, i) => <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded font-medium border border-slate-200">{req}</span>)}
                </div>
              </div>
              <div className="prose max-w-none text-slate-700 mb-8"><h4 className="font-bold text-slate-900 text-lg mb-2">Role Blueprint</h4><p className="leading-relaxed text-sm whitespace-pre-wrap">{selectedJob.description}</p></div>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-1.5"><UploadCloud className="h-5 w-5 text-indigo-500" /> Active ATS Submission Chamber</h4>
              {success ? (
                <div className="flex items-center gap-2 p-4 bg-emerald-50 text-emerald-800 rounded-md border border-emerald-200 text-sm font-semibold"><CheckCircle className="h-5 w-5" /> Parsing algorithm finalized! Profile score indexed directly inside Recruiter desk dashboards.</div>
              ) : (
                <form onSubmit={handleApply} className="flex flex-col sm:flex-row items-center gap-4">
                  <input type="file" required accept=".txt,.pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer" />
                  <button type="submit" disabled={!file} className="w-full sm:w-auto px-6 py-2 bg-slate-900 text-white font-bold rounded shadow hover:bg-slate-800 disabled:opacity-40 transition text-sm whitespace-nowrap">Transmit Pipeline Request</button>
                </form>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-400 font-medium text-sm">Select an operational vacancy descriptor trace profile block.</div>
        )}
      </div>
    </div>
  );
};
