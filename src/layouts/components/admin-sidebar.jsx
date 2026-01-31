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
import { useSelector } from "react-redux";

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
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

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
        {console.log("user", user)}
      {/* Footer */}
      <SidebarFooter>
        <div className="mt-4 flex items-center gap-3 rounded-lg bg-muted p-3 shadow-sm">
          {/* Optional Avatar */}
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-muted-foreground font-bold">
              {user.name ? user.name[0] : "A"}
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-foreground">
              {user.name || "Admin Name"}
            </p>
            <p className="text-xs text-muted-foreground">
              {user.role || "ADMIN"}
            </p>
            <p className="text-xs text-muted-foreground truncate max-w-[150px]">
              {user.organization?.collegeName || "Institute Name"}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
