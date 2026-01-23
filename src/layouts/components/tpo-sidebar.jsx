
import { NavLink, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  Building,
  Briefcase,
  BarChart,
  FileCheck,
  Bell,
  LifeBuoy,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "../../components/ui/sidebar";

import Logo from "../../components/logo/Logo";
import { useSelector } from "react-redux";

export function TpoSidebar() {
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  const menuItems = [
    { to: "/tpo", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/tpo/students", icon: Users, label: "Students" },
    { to: "/tpo/companies", icon: Building, label: "Companies" },
    { to: "/tpo/jobs", icon: Briefcase, label: "Jobs & Drives" },
    { to: "/tpo/applications", icon: BarChart, label: "Applications" },
    { to: "/tpo/placement-tracker", icon: FileCheck, label: "Placement Tracker" },
    { to: "/tpo/notifications", icon: Bell, label: "Notifications" },
  ];

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader>
        <Logo />



      </SidebarHeader>

      {/* Main menu */}
      <SidebarMenu className="flex-1">
        {menuItems.map((item) => {
          const active = location.pathname === item.to;
          const Icon = item.icon;

          return (
            <SidebarMenuItem key={item.to}>
              <NavLink
                key={item.to}
                to={item.to}
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
      {/* Footer */}
      <SidebarFooter>
        <div className="mt-4 flex items-center gap-3 rounded-lg bg-muted p-3 shadow-sm">
          {/* Optional Avatar */}
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-muted-foreground font-bold">
              {user.name ? user.name[0] : "TPO"}
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-foreground">
              {user.name || "TPO Name"}
            </p>
            <p className="text-xs text-muted-foreground">
              {user.role || "TPO"}
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
