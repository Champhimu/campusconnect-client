// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginPage from './pages/auth/Login';
// import RequestAccessPage from './pages/auth/RequestAccessForm';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/requestTrial" element={<RequestAccessPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/auth/Login";
import RequestAccessPage from "./pages/auth/RequestAccessForm";
import ForgotPassword from "./pages/auth/ForgotPassword";

import StudentDashboard from "./pages/student/Dashboard";
import CompanyDashboard from "./pages/company/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import TPODashboard from "./pages/tpo/Dashboard";

/* Company layout + pages */
import CompanyLayout from "./layouts/CompanyLayout";

import CompanyJobs from "./pages/company/Jobs";
import CompanyProfile from "./pages/company/Profile";
import ApplicantsPage from "./pages/company/Applicants";


function App() {
  return (
    <Router>
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/requestTrial" element={<RequestAccessPage />} />

        {/* DASHBOARDS */}
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/company" element={<CompanyDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/tpo" element={<TPODashboard />} />

         {/*  COMPANY (WITH LAYOUT) */}
        <Route path="/dashboard/company" element={<CompanyLayout />}>
          <Route index element={<CompanyDashboard />} />
          <Route path="jobs" element={<CompanyJobs />} />
          <Route path="profile" element={<CompanyProfile />} />
            <Route path="applicants" element={<ApplicantsPage />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
