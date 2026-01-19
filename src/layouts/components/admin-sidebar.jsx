// src/layouts/components/admin-sidebar.jsx
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "../../components/ui/sidebar";
import Logo  from "../../components/logo/Logo";
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
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/users", icon: Users, label: "User Management" },
  { href: "/admin/companies", icon: Building, label: "Companies" },
  { href: "/admin/company-config", icon: FileCog, label: "Company Config" },
  { href: "/admin/reports", icon: BarChart, label: "Reports" },
  { href: "/admin/announcements", icon: Bell, label: "Announcements" },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      {/* Main menu */}
      <SidebarMenu className="flex-1">
        {menuItems.map((item) => {
          const active = location.pathname === item.href;
          const Icon = item.icon;

          return (
            <SidebarMenuItem key={item.href}>
              <NavLink 
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm
              ${active ? "bg-muted font-medium" : "hover:bg-muted text-muted-foreground"}`}
              >
                  <Icon />
                  <span>{item.label}</span>
              </NavLink>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>

      {/* Footer */}
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
