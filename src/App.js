import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

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

{/* STUDENT ROUTES */}
<Route
  path="/student"
  element={
    <ProtectedRoute allowedRoles={["STUDENT"]}>
      <StudentLayout />
    </ProtectedRoute>
  }
>
  {/* Student Dashboard */}
  <Route path="dashboard" element={<StudentDashboard />} />

  {/* Future student pages can be added here */}
  {/* <Route path="profile" element={<StudentProfile />} /> */}
  {/* <Route path="resume" element={<StudentResume />} /> */}
  {/* <Route path="jobs" element={<StudentJobs />} /> */}
  {/* <Route path="application-status" element={<StudentApplicationStatus />} /> */}
  {/* <Route path="resume-score" element={<StudentResumeScore />} /> */}
  {/* <Route path="placement-history" element={<StudentPlacementHistory />} /> */}
  {/* <Route path="notifications" element={<StudentNotifications />} /> */}
</Route>


      </Routes>
    </Router>
  );
}

export default App;



