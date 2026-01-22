import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "../../components/ui/sidebar";

import Logo from "../../components/logo/Logo";

import {
  LayoutDashboard,
  Briefcase,
  FileText,
  User,
  Upload,
  History,
  Bell,
  Wand2,
  LifeBuoy,
  Settings,
} from "lucide-react";
import { useSelector } from "react-redux";

/* Sidebar menu items */
const menuItems = [
  { href: "/student", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/student/profile", icon: User, label: "My Profile" },
  { href: "/student/resume", icon: Upload, label: "Resume & Skills" },
  { href: "/student/jobs", icon: Briefcase, label: "Jobs" },
  { href: "/student/application-status", icon: FileText, label: "Application Status" },
  { href: "/student/resume-score", icon: Wand2, label: "AI Resume Score" },
  { href: "/student/placement-history", icon: History, label: "Placement History" },
  { href: "/student/notifications", icon: Bell, label: "Notifications" },
];

export default function StudentSidebar() {
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
      <div className="mt-4 flex items-center gap-3 rounded-lg bg-muted p-3 shadow-sm">
          {/* Optional Avatar */}
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-muted-foreground font-bold">
              {user.name ? user.name[0] : "STUDENT"}
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-foreground">
              {user.name || "Student Name"}
            </p>
            <p className="text-xs text-muted-foreground">
              {user.role || "STUDENT"}
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

