# CampusConnect – Frontend

CampusConnect is a role-based On-Campus Placement Management System (OPMS) frontend built using **React.js** and **Tailwind CSS**.  
It provides separate dashboards and workflows for **Admin, TPO, Student, and Company** users.

---

## Tech Stack
- React.js
- Tailwind CSS
- React Router DOM
- Axios
- Context API
- Redux State Management
---

## 📂 Folder Structure Overview

src/
- assets/          → Images & icons
- components/      → Reusable UI components
- layouts/         → Role-based layouts (Admin, TPO, Student, Company)
- pages/           → Screen-level components
- routes/          → Application routing
- services/        → API service files
- context/         → Global state management
- utils/           → Helpers & constants

---

## 👥 Role-Based Interfaces

### 1️ College Admin
- Dashboard & reports
- User management (TPOs, Students)
- Academic data upload (CGPA, backlogs)
- College configuration
- Company collaboration monitoring

### 2️ TPO
- Student management
- Job & drive creation
- Application pipeline tracking
- Placement tracking
- Notifications & audit logs

### 3️ Student
- Profile & resume management
- On-campus & external job listings
- Application status tracking
- AI-powered resume ATS score & suggestions

### 4️ Company
- Company profile
- Job posting & applicant tracking
- Offer uploads
- College invite requests

---

# **Setup Instructions**

## 1️ **Clone the Repository**

```sh
git clone https://github.com/<Champhimu>/campusconnect-client.git
cd campusconnect-client
```

## 2️ **Install dependencies**

```sh
npm install
```

## 3 **Create .env file**

```sh
cp .env.example .env
```

## 4 **Start development server**

```sh
npm run dev
```

Frontend runs at: **[http://localhost:3000](http://localhost:3000)**

---