# 🚀 TalentForge — Full-Stack Job Portal & ATS Platform

TalentForge is a production-ready **Job Portal and Applicant Tracking System (ATS)** built to streamline recruitment workflows for candidates, recruiters, and administrators.

The platform includes role-based authentication, job management, resume processing, algorithmic resume-to-job matching, recruitment workflows, and a scalable full-stack architecture.

## 🔗 Live Production Deployment

* 🌐 **Frontend:** https://job-portal-ats.vercel.app/
* 📡 **Backend API:** https://job-portal-ats-kk9p.onrender.com
* 💻 **GitHub:** https://github.com/Mobin977/job-portal-ats

---

## ✨ Key Features

### 👤 Candidate

* User registration and login
* Browse available jobs
* Search and filter jobs
* Apply for jobs
* Upload resumes
* Track application status
* Resume-to-job matching score
* Candidate profile management

### 🏢 Recruiter

* Create job postings
* Update job postings
* Manage job listings
* Review candidate applications
* View candidate profiles
* View uploaded resumes
* Manage recruitment workflows
* Track hiring activity

### 🛡️ Administrator

* Role-based access control
* Manage users
* Manage organizations
* Monitor platform activity
* Access recruitment analytics
* Manage platform resources

---

## 📄 Resume & ATS Processing

TalentForge provides algorithmic resume processing and matching functionality.

Supported resume formats include:

* `.txt`
* `.pdf`

### Matching Pipeline

```text
Resume Upload
      │
      ▼
File Processing
      │
      ▼
Text Extraction
      │
      ▼
Tokenization
      │
      ▼
Job Requirement Comparison
      │
      ▼
Keyword Matching
      │
      ▼
ATS Matching Score
```

The current ATS matching engine uses an **algorithmic keyword/token matching approach** rather than an external LLM.

---

## 🏗️ System Architecture

```text
                     ┌──────────────────────────┐
                     │   React 18 + TypeScript  │
                     │       Vite Frontend      │
                     └────────────┬─────────────┘
                                  │
                               REST API
                                  │
                                  ▼
                     ┌──────────────────────────┐
                     │     Node.js + Express    │
                     │        TypeScript        │
                     │                          │
                     │ JWT Authentication       │
                     │ RBAC Middleware          │
                     │ Job Management            │
                     │ Resume Processing         │
                     │ ATS Matching Engine       │
                     └────────────┬─────────────┘
                                  │
                                  ▼
                     ┌──────────────────────────┐
                     │       Prisma ORM         │
                     └────────────┬─────────────┘
                                  │
                                  ▼
                     ┌──────────────────────────┐
                     │       PostgreSQL         │
                     └──────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

* React 18
* TypeScript
* Vite
* Tailwind CSS
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* TypeScript
* JWT
* Bcrypt
* Multer

### Database

* PostgreSQL
* Prisma ORM

### Infrastructure

* Docker
* Docker Compose
* Nginx
* Vercel
* Render

---

## 🔐 Authentication & Authorization

TalentForge uses JWT-based authentication and role-based authorization.

Supported application roles include:

* Candidate
* Recruiter
* Administrator

Protected resources are accessible only after successful authentication and authorization.

Security mechanisms include:

* JWT authentication
* RBAC middleware
* Protected API routes
* Password hashing with Bcrypt
* Request validation
* Database constraints
* Environment-based secrets

---

## 🏢 Multi-Tenant Architecture

The platform is designed to support organization-level separation.

Recruitment data can be associated with specific organizations while role-based permissions control access to protected resources.

This architecture provides a foundation for SaaS-style recruitment platforms.

---

## 📊 Recruitment Analytics

The platform supports recruitment-related analytics such as:

* Job activity
* Application activity
* Candidate status
* Recruitment workflow metrics
* Organization-level activity

Analytics data is handled through the PostgreSQL/Prisma data layer.

---

## 📂 Project Structure

```text
job-portal-ats/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── server.ts
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.tsx
│   │
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## 🗄️ Database Architecture

PostgreSQL is used as the primary relational database.

Prisma ORM provides:

* Type-safe database queries
* Relational data modeling
* Schema management
* Database migrations
* Transactions
* Database constraints

The database manages entities such as:

* Users
* Organizations
* Jobs
* Applications
* Resumes
* Candidate profiles
* Recruitment workflows

---

## 📤 Resume Upload Architecture

Resume files are processed through a multipart upload pipeline.

```text
Candidate
    │
    ▼
Resume Upload
    │
    ▼
Multer Multipart Processing
    │
    ▼
File Type Validation
    │
    ▼
Text Extraction
    │
    ▼
ATS Matching Engine
    │
    ▼
Matching Percentage
```

---

## 🐳 Run Locally

### Prerequisites

Install:

* Node.js
* Git
* Docker Desktop

### Clone Repository

```bash
git clone https://github.com/Mobin977/job-portal-ats.git

cd job-portal-ats
```

### Start With Docker

```bash
docker compose up --build
```

### Local Services

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

---

## ⚙️ Environment Variables

Backend example:

```env
DATABASE_URL=
JWT_SECRET=
PORT=5000
```

Frontend example:

```env
VITE_API_URL=
```

Never commit:

```text
.env
.env.local
database passwords
JWT secrets
API keys
production credentials
```

Use `.env.example` files to document required configuration.

---

## 🌐 Production Configuration

### Frontend

```text
https://job-portal-ats.vercel.app/
```

### Backend

```text
https://job-portal-ats-kk9p.onrender.com
```

Frontend API configuration:

```env
VITE_API_URL=https://job-portal-ats-kk9p.onrender.com
```

---

## 📸 Screenshots

Add real screenshots from the deployed application.

### Candidate Dashboard

```text
Add screenshot here
```

### Job Listings

```text
Add screenshot here
```

### Resume Upload

```text
Add screenshot here
```

### ATS Matching

```text
Add screenshot here
```

### Recruiter Dashboard

```text
Add screenshot here
```

### Admin Dashboard

```text
Add screenshot here
```

---

## 📊 Engineering Highlights

This project demonstrates practical experience with:

* Full-stack application architecture
* React
* TypeScript
* Node.js
* Express.js
* REST API development
* PostgreSQL
* Prisma ORM
* JWT authentication
* RBAC
* Bcrypt password hashing
* Multer file processing
* Resume text extraction
* Algorithmic ATS matching
* Multi-tenant application design
* Docker
* Nginx
* Vercel
* Render

---

## 🎯 What This Project Demonstrates

**Full-Stack Development**

Complete frontend, backend, database, authentication, file processing, and deployment workflow.

**ATS Engineering**

Resume processing and algorithmic job-to-resume matching.

**Role-Based Architecture**

Separate workflows and permissions for candidates, recruiters, and administrators.

**Database Engineering**

Relational PostgreSQL data modeling using Prisma ORM.

**Security**

JWT authentication, password hashing, protected routes, and role-based authorization.

**DevOps**

Dockerized development with cloud deployment through Vercel and Render.

---

## 🚀 Future Improvements

* AI/LLM-powered resume analysis
* Semantic resume-to-job matching
* Resume ranking
* Automated interview scheduling
* Email notifications
* Advanced recruiter analytics
* Elasticsearch-powered job search
* Automated testing
* GitHub Actions CI/CD
* AWS infrastructure
* Resume recommendation engine
* AI-generated candidate summaries
* AI-generated job descriptions

---

## 👨‍💻 Author

**Mobin977**

Full-Stack Developer focused on building production-ready applications with:

**React • TypeScript • Node.js • Express • PostgreSQL • Prisma • Docker • Cloud Technologies**

---

## 🔗 Project Links

* 🌐 **Live Application:** https://job-portal-ats.vercel.app/
* 📡 **Backend API:** https://job-portal-ats-kk9p.onrender.com
* 💻 **GitHub:** https://github.com/Mobin977/job-portal-ats

---

⭐ If you find this project useful, consider giving the repository a star!
