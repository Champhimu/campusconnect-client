
import { SidebarProvider, SidebarInset } from "../components/ui/sidebar";
import { TpoSidebar } from "./components/tpo-sidebar";
import { Outlet } from "react-router-dom";

export default function TpoLayout() {
  return (
    <SidebarProvider>
      <TpoSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
