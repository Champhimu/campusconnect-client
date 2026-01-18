// src/layouts/components/admin-sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "../../components/ui/sidebar"; // relative path
import { Logo } from "../../components/logo";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Building,
  Settings,
  Bell,
  BarChart,
  BookUser,
  LifeBuoy,
  FileCog,
} from "lucide-react";

const menuItems = [
  { href: "/dashboard/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/admin/users", icon: Users, label: "User Management" },
  { href: "/dashboard/admin/companies", icon: Building, label: "Companies" },
  { href: "/dashboard/admin/company-config", icon: FileCog, label: "Company Config" },
  { href: "/dashboard/admin/reports", icon: BarChart, label: "Reports" },
  { href: "/dashboard/admin/announcements", icon: Bell, label: "Announcements" },
];

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      <SidebarMenu className="flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <SidebarMenuItem key={item.href}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-2 ${
                    isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                  } rounded-md px-3 py-2`
                }
              >
                <Icon />
                <span>{item.label}</span>
              </NavLink>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Help">
              <LifeBuoy />
              <span>Help</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
