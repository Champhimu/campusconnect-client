import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* AUTH */
import LoginPage from "./pages/auth/Login";
import RequestAccessPage from "./pages/auth/RequestAccessForm";
import ForgotPassword from "./pages/auth/ForgotPassword";

/* DASHBOARDS */
import StudentDashboard from "./pages/student/Dashboard";
import CompanyDashboard from "./pages/company/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";

/* TPO */
import TPODashboard from "./pages/tpo/Dashboard";
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

// Student Layouts
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

function App() {

  const redirectToDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return <LoginPage />; // Not logged in → show login

    // Logged in → redirect based on role
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

        {/* AUTH */}
        <Route path="/" element={redirectToDashboard()} />
        <Route path="/request-trial" element={<RequestAccessPage />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/requestTrial" element={<RequestAccessPage />} />

        {/* DASHBOARDS */}
        <Route path="/dashboard/student" element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentDashboard />
          </ProtectedRoute>
        } />
        <Route
          path="/company"
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

        {/* ADMIN */}
        <Route path="/dashboard/admin" element={
          <ProtectedRoute allowedRoles={["CADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/tpo" element={
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


        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          {/* Student Dashboard */}
          <Route index element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfilePage />} />
          <Route path="/student/jobs" element={<Jobs />} />
          <Route path="application-status" element={<ApplicationStatusPage />} />
          <Route path="companies" element={<StudentCompaniesPage />} />
          <Route path="notifications" element={<StudentNotificationsPage />} />
          <Route path="placement-history" element={<PlacementHistoryPage />} />
          <Route path="/student/resume-score" element={<ResumeEnhancer />} />
          <Route path="/student/resume-score" element={<ResumeScore />} />
          <Route path="/student/resume" element={<ResumeAndSkillsPage />} />

        </Route>


      </Routes>
    </Router>
  );
}

export default App;