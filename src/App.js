import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
/* Landing page */
import LandingPage from "./pages/LandingPage";
/* AUTH */
import LoginPage from "./pages/auth/Login";
import RequestAccessPage from "./pages/auth/RequestAccessForm";
import ForgotPassword from "./pages/auth/ForgotPassword";

/* DASHBOARDS */
import StudentDashboard from "./pages/student/Dashboard";
import CompanyDashboard from "./pages/company/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import TPODashboard from "./pages/tpo/Dashboard";

/* TPO */
import TpoStudentsPage from "./pages/tpo/Students";
import TpoLayout from "./layouts/TpoLayout";
import TpoCompaniesPage from "./pages/tpo/Companies";
import TpoJobsPage from "./pages/tpo/Jobs";
import TpoApplicationsPage from "./pages/tpo/Applications";
import PlacementTrackerPage from "./pages/tpo/PlacementTracker";
import TpoNotificationsPage from "./pages/tpo/Notifications";
import ProtectedRoute from "./components/ProtectedRoute";

/* Company layout + pages */
import CompanyLayout from "./pages/company/layout";
import CompanyJobs from "./pages/company/Jobs";
import CompanyProfile from "./pages/company/Profile";
import ApplicantsPage from "./pages/company/Applicants";
import CollegeInvites from "./pages/company/CollegeInvites";


// Layouts
import StudentLayout from "./layouts/StudentLayout";
import StudentProfilePage from "./pages/student/StudentProfilePage"; 
import Jobs from "./pages/student/Jobs";
import ApplicationStatusPage from "./pages/student/ApplicationStatus";
import StudentCompaniesPage from "./pages/student/Companies";
import StudentNotificationsPage from "./pages/student/Notifications";
import PlacementHistoryPage from "./pages/student/PlacementHistory";
import ResumeEnhancer from "./pages/student/ResumeEnhancer";
import ResumeScore from "./pages/student/ResumeScore";
import ResumeAndSkillsPage from "./pages/student/ResumeAndSkills";

/* ADMIN */
import AdminLayout from "./layouts/AdminLayout";
// import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/users";
import AdminCompaniesPage from "./pages/admin/companies";
import CompanyConfigPage from "./pages/admin/CompanyConfig";
import ReportsPage from "./pages/admin/Reports";
import AnnouncementsPage from "./pages/admin/Announcements";

import { useDispatch, useSelector } from "react-redux";
import { setCredentialsFromStorage } from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCredentialsFromStorage());
  }, [dispatch]);

  const LoginRedirect = () => {
  const { user, token } = useSelector((state) => state.auth);

  if (!token || !user) {
    return <LoginPage />;
  }

  switch (user.role) {
    case "STUDENT":
      return <Navigate to="/student" replace />;
    case "COMPANY":
      return <Navigate to="/company" replace />;
    case "CADMIN":
      return <Navigate to="/admin" replace />;
    case "TPO":
      return <Navigate to="/tpo" replace />;
    default:
      return <LoginPage />;
  }
};


  return (
    <Router>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        {/* AUTH */}
        <Route path="/login" element={<LoginRedirect />} />
        <Route path="/request-trial" element={<RequestAccessPage />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/requestTrial" element={<RequestAccessPage />} />

        <Route path="/company"
          element={
            <ProtectedRoute allowedRoles={["COMPANY"]}>
              <CompanyLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CompanyDashboard />} />
          <Route path="dashboard" element={<CompanyDashboard />} />
          <Route path="jobs" element={<CompanyJobs />} />
          <Route path="profile" element={<CompanyProfile />} />
          <Route path="applicants" element={<ApplicantsPage />} />
          <Route path="invites" element={<CollegeInvites />} />
        </Route>

        <Route path="/tpo" 
        element={
          <ProtectedRoute allowedRoles={["TPO"]}>
            <TpoLayout />
          </ProtectedRoute>
        }>
          <Route index element={<TPODashboard />} />
          <Route path="students" element={<TpoStudentsPage />} />
          <Route path="companies" element={<TpoCompaniesPage />} />
          <Route path="applications" element={<TpoApplicationsPage />} />
          <Route path="placement-tracker" element={<PlacementTrackerPage />} />
          <Route path="notifications" element={<TpoNotificationsPage />} />
          <Route path="jobs" element={<TpoJobsPage />} />
        </Route>


        <Route path="/student"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          {/* Student Dashboard */}
          <Route index element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfilePage />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="application-status" element={<ApplicationStatusPage />} />
          <Route path="companies" element={<StudentCompaniesPage />} />
          <Route path="notifications" element={<StudentNotificationsPage />} />
          <Route path="placement-history" element={<PlacementHistoryPage />} />
          <Route path="resume-score" element={<ResumeEnhancer />} />
          <Route path="resume-score" element={<ResumeScore />} />
          <Route path="resume" element={<ResumeAndSkillsPage />} />

        </Route>

      {/* ADMIN ONLY */}
        <Route path="/admin" 
        element={
            <ProtectedRoute allowedRoles={["CADMIN"]}>
              <AdminLayout />
            </ProtectedRoute>
          }>
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
