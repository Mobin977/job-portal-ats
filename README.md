# 🚀 TalentForge - Full-Stack Job Portal & AI-Driven ATS Platform

A production-ready, multi-tenant Job Board and Applicant Tracking System (ATS) engineered with a robust backend architecture, strict type security, role-based entry gates, and an algorithmic keyword-tokenizer compliance engine.

## 🔗 Live Production Gateways

- **🌐 Live User Interface (Vercel):** [https://vercel.app](https://vercel.app)
- **📡 Live Core REST API Server (Render):** [https://onrender.com](https://onrender.com)

---

## 🌟 Key Architectural Features

- **Algorithmic Compliance Screening:** Features an in-memory string-tokenized extraction parsing sequence that evaluates uploaded candidate documents (`.txt`, `.pdf`) and outputs a contextual percentage matching score against role requirements instantly.
- **Strict Multi-Role Security:** Engineered custom Express middleware routing interceptors utilizing JWT state transmission payloads to segment candidate boards, recruiter dashboards, and admin viewports under strict RBAC restrictions.
- **Relational Data Mapping Layer:** Implemented an optimized PostgreSQL layer via Prisma ORM utilizing transactional batch aggregations and unique constraint protection patterns.
- **High-Performance Microservices:** Fully dockerized ecosystem leveraging multi-stage Alpine images and an Nginx reverse routing proxy node configuration block.

---

## 🛠️ Technology Integration Blueprint

### 📡 Backend Core Service Node

- **Framework:** Node.js, Express.js (Native ES Module Layout Syntax)
- **Database Architecture:** PostgreSQL & Prisma ORM Data Mapping
- **Security Engine:** JSON Web Tokens (JWT) & 12-Round Salt Bcrypt Hashing
- **File Management:** Multer Buffer Multipart Form Stream Ingestion

### 🎨 Frontend Client Interface

- **Framework:** React 18, Vite Engine, TypeScript Compiler Layout
- **Style Directives:** Tailwind CSS, PostCSS Bridge Pipeline
- **Network Interface:** Axios Automated Authorization Bearer Header Interceptors
- **Icons Library:** Lucide React Vectors Asset Sheets

---

## 🐳 Containerized Execution Guide (Local Setup)

To execute this complete enterprise stack locally with zero configuration barriers, verify your local Docker desktop application daemon layer is active, clone this workspace repository, and execute the orchestration command line at the repository root:

```bash
docker-compose up --build
```

- **Frontend User Gateway Dashboard:** `http://localhost:5173`
- **Backend Core REST API Server Routing Path:** `http://localhost:5000`
