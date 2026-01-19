
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "../components/ui/sidebar";
import StudentSidebar  from "../layouts/components/student-sidebar";

export default function StudentLayout() {
  return (
    <SidebarProvider>
      {/* Student Sidebar */}
      <StudentSidebar />

      {/* Main content area */}
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
