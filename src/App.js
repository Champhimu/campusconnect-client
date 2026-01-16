import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/auth/Login";
import RequestAccessPage from "./pages/auth/RequestAccessForm";
import ForgotPassword from "./pages/auth/ForgotPassword";

import StudentDashboard from "./pages/student/Dashboard";
import CompanyDashboard from "./pages/company/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import TPODashboard from "./pages/tpo/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const redirectToDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return <LoginPage />; // Not logged in → show login

    // Logged in → redirect based on role
    switch (user.role) {
      case "STUDENT":
        return <Navigate to="/dashboard/student" replace />;
      case "COMPANY":
        return <Navigate to="/dashboard/company" replace />;
      case "CADMIN":
        return <Navigate to="/dashboard/admin" replace />;
      case "TPO":
        return <Navigate to="/dashboard/tpo" replace />;
      default:
        return <LoginPage />;
    }
  };
  
  return (
    <Router>
      <Routes>
        {/* AUTH */}
        <Route path="/" element={redirectToDashboard()} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/requestTrial" element={<RequestAccessPage />} />

        {/* DASHBOARDS */}
        <Route path="/dashboard/student" element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentDashboard />
          </ProtectedRoute>
          } />
        <Route path="/dashboard/company" element={
          <ProtectedRoute allowedRoles={["COMPANY"]}>
            <CompanyDashboard />
          </ProtectedRoute>
          } />
        <Route path="/dashboard/admin" element={
          <ProtectedRoute allowedRoles={["CADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
          } />
        <Route path="/dashboard/tpo" element={
          <ProtectedRoute allowedRoles={["TPO"]}>
            <TPODashboard />
          </ProtectedRoute>
          } />
      </Routes>
    </Router>
  );
}

export default App;
