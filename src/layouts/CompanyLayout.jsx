import { Outlet } from "react-router-dom";
import CompanySidebar from "./components/Sidebar";
import { SidebarProvider, SidebarInset } from "../components/ui/sidebar";

const CompanyLayout = () => {
  return (
    <SidebarProvider>
          {/* Student Sidebar */}
          <CompanySidebar />
    
          {/* Main content area */}
          <SidebarInset>
            <Outlet />
          </SidebarInset>
        </SidebarProvider>
  );
};

export default CompanyLayout;
