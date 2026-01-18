import React from "react";
import { Outlet } from "react-router-dom";

import { SidebarProvider } from "../components/ui/sidebar";
import StudentSidebar from "./components/student-sidebar";


const StudentLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-[260px] shrink-0 border-r bg-background">
          <StudentSidebar />
        </aside>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-muted/30">
          <Outlet />
        </main>

      </div>
    </SidebarProvider>
  );
};

export default StudentLayout;
