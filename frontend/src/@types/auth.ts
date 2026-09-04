export type UserRole = 'CANDIDATE' | 'RECRUITER' | 'ADMIN';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}

export interface JobPosting {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  salaryRange?: string;
  createdAt: string;
  recruiter: {
    companyName: string;
    companyLogo?: string;
  };
}

export interface ApplicationEntry {
  id: string;
  status: 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'OFFERED' | 'REJECTED';
  atsScore: number;
  createdAt: string;
  job: { title: string };
  candidate: {
    user: { firstName: string; lastName: string; email: string };
  };
}
