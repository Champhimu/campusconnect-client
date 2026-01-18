import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../components/ui/sidebar";
import { AdminSidebar } from "./components/admin-sidebar";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">

        {/* Sidebar */}
        <aside className="w-[260px] shrink-0 border-r bg-background">
          <AdminSidebar />
        </aside>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
          <Outlet />
        </main>

      </div>
    </SidebarProvider>
  );
}
