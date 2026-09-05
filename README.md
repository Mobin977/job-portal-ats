# 🚀 TalentForge — Full-Stack Job Portal & ATS Platform

TalentForge is a production-ready **Job Portal and Applicant Tracking System (ATS)** built to streamline recruitment workflows for candidates, recruiters, and administrators.

The platform includes role-based authentication, job management, resume processing, algorithmic resume-to-job matching, recruitment workflows, and a scalable full-stack architecture.

## 🔗 Live Demo

* 🌐 **Frontend:** https://vercel.app
* 📡 **Backend API:** https://onrender.com
* 💻 **GitHub:** https://github.com/Mobin977/job-portal-ats

---

## ✨ Key Features

### 👤 Candidate

* User registration and login
* Browse available jobs
* Search and apply for jobs
* Upload resumes
* Track application status
* Resume-to-job matching score

### 🏢 Recruiter

* Create and manage job postings
* Review candidate applications
* View candidate profiles and resumes
* Manage recruitment workflows
* Track hiring activity

### 🛡️ Administrator

* Role-based access control
* Manage users and organizations
* Monitor platform activity
* Access recruitment analytics

### 📄 Resume & ATS Processing

* Supports `.txt` and `.pdf` resumes
* Resume text extraction
* Keyword/token-based matching
* Job requirement comparison
* Matching percentage generation

> The ATS matching engine uses an algorithmic keyword/token matching approach rather than an external LLM.

---

## 🏗️ Architecture

```text
┌──────────────────────────────┐
│      React + TypeScript      │
│          Vite Frontend       │
└──────────────┬───────────────┘
               │
               │ REST API
               ▼
┌──────────────────────────────┐
│       Node.js + Express      │
│        Backend API           │
│                              │
│ JWT Authentication           │
│ RBAC Middleware              │
│ Resume Processing            │
│ ATS Matching Engine          │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       Prisma ORM             │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        PostgreSQL            │
└──────────────────────────────┘

Resume Upload
      │
      ▼
Text Extraction
      │
      ▼
Keyword Matching
      │
      ▼
ATS Match Score
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

## 🔐 Security

The application implements:

* JWT-based authentication
* Role-based authorization
* Protected API routes
* Password hashing with Bcrypt
* Request validation
* Database constraints
* Environment-based secret management

Sensitive credentials and environment variables are **not stored in the repository**.

---

## 🐳 Run Locally

### Prerequisites

Make sure you have installed:

* Node.js
* Docker Desktop
* Git

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

Create your environment files using the provided example configuration.

Example:

```env
DATABASE_URL=
JWT_SECRET=
PORT=
```

Never commit real credentials, API keys, database passwords, or secrets to GitHub.

---

## 📸 Screenshots

### Candidate Dashboard

*Add screenshot here*

### Job Listings

*Add screenshot here*

### Resume Upload / ATS Matching

*Add screenshot here*

### Recruiter Dashboard

*Add screenshot here*

### Admin Dashboard

*Add screenshot here*

---

## 📊 Engineering Highlights

This project demonstrates practical experience with:

* Full-stack application architecture
* REST API development
* Role-based access control
* Relational database modeling
* Prisma ORM
* Secure authentication
* Resume file processing
* Algorithmic ATS matching
* Multi-tenant application design
* Dockerized development
* Nginx reverse proxy configuration
* Cloud deployment

---

## 🚀 Future Improvements

* AI/LLM-powered resume analysis
* Semantic resume-to-job matching
* Email notifications
* Advanced recruiter analytics
* Elasticsearch-powered job search
* Automated testing and CI/CD
* AWS-based infrastructure

---

## 👨‍💻 Author

**Mobin977**

Full-Stack Developer focused on building production-ready applications with **React, TypeScript, Node.js, PostgreSQL, and modern cloud technologies.**

---

⭐ If you find this project useful, consider giving the repository a star!
