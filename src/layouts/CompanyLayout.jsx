import { Outlet } from "react-router-dom";
import CompanySidebar from "./components/Sidebar";

const CompanyLayout = () => {
  return (
    <div className="flex min-h-screen">
      <CompanySidebar />
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default CompanyLayout;
