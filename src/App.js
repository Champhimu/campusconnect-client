import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* AUTH */
import LoginPage from "./pages/auth/Login";
import RequestAccessPage from "./pages/auth/RequestAccessForm";

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


function App() {
  return (
    <Router>
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/request-trial" element={<RequestAccessPage />} />

        {/* OTHER DASHBOARDS */}
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/company" element={<CompanyDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />

        {/* ✅ TPO NESTED ROUTES */}
        <Route path="/dashboard/tpo" element={<TpoLayout />}>
          <Route index element={<TPODashboard />} />
          <Route path="students" element={<TpoStudentsPage />} />
          <Route path="companies" element={<TpoCompaniesPage />} />
          <Route path="applications" element={<TpoApplicationsPage />} />
          <Route path="placement-tracker" element={<PlacementTrackerPage />} />
            <Route path="notifications" element={<TpoNotificationsPage />} />
          <Route path="jobs" element={<TpoJobsPage />} />   
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import TpoLayout from "./layouts/TpoLayout";

// import TPODashboard from "./pages/tpo/Dashboard";
// import TpoStudentsPage from "./pages/tpo/Students";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* TPO ROUTES WITH LAYOUT */}
//         <Route path="/dashboard/tpo" element={<TpoLayout />}>
//           <Route index element={<TPODashboard />} />
//           <Route path="students" element={<TpoStudentsPage />} />
//         </Route>

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
