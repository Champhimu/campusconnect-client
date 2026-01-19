// src/layouts/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./components/admin-sidebar";
import { SidebarProvider, SidebarInset } from "../components/ui/sidebar";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      {/* Student Sidebar */}
      <AdminSidebar />

      {/* Main content area */}
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
