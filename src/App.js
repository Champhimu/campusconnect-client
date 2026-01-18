import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/auth/Login";
import RequestAccessPage from "./pages/auth/RequestAccessForm";
import ForgotPassword from "./pages/auth/ForgotPassword";

import StudentDashboard from "./pages/student/Dashboard";
import CompanyDashboard from "./pages/company/Dashboard";
import TPODashboard from "./pages/tpo/Dashboard";

/* COMPANY */
import CompanyLayout from "./layouts/CompanyLayout";
import CompanyJobs from "./pages/company/Jobs";
import CompanyProfile from "./pages/company/Profile";
import ApplicantsPage from "./pages/company/Applicants";
import CollegeInvites from "./pages/company/CollegeInvites";

/* ADMIN */
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/users";
import AdminCompaniesPage from "./pages/admin/companies";
import CompanyConfigPage from "./pages/admin/CompanyConfig";

import ReportsPage from "./pages/admin/Reports";

import AnnouncementsPage from "./pages/admin/Announcements";

function App() {
  return (
    <Router>
      <Routes>

        {/* AUTH */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/requestTrial" element={<RequestAccessPage />} />

        {/* STUDENT & TPO */}
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/tpo" element={<TPODashboard />} />

        {/* COMPANY */}
        <Route path="/dashboard/company" element={<CompanyLayout />}>
          <Route index element={<CompanyDashboard />} />
          <Route path="jobs" element={<CompanyJobs />} />
          <Route path="profile" element={<CompanyProfile />} />
          <Route path="applicants" element={<ApplicantsPage />} />
          <Route path="invites" element={<CollegeInvites />} />
          
        </Route>

      {/* ADMIN ONLY */}
        <Route path="/dashboard/admin" element={<AdminLayout />}>
           <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
             <Route path="companies" element={<AdminCompaniesPage/>} />
              <Route path="company-config" element={<CompanyConfigPage />} />
              <Route path="reports" element={<ReportsPage />} />
             <Route path="announcements" element={<AnnouncementsPage />} />
         </Route>

        
      </Routes>
    </Router>
  );
}

export default App;
