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

const menuItems = [
  { path: "/student/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/student/profile", icon: User, label: "My Profile" },
  { path: "/student/resume", icon: FileText, label: "Resume & Skills" },
  { path: "/student/jobs", icon: Briefcase, label: "Jobs" },
  { path: "/student/application-status", icon: Upload, label: "Application Status" },
  { path: "/student/resume-score", icon: Wand2, label: "AI Resume Score" },
  { path: "/student/placement-history", icon: History, label: "Placement History" },
  { path: "/student/notifications", icon: Bell, label: "Notifications" },
];

const StudentSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      {/* Main Menu */}
      <SidebarMenu className="flex-1">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;

          return (
            <SidebarMenuItem key={item.path}>
              <NavLink to={item.path} className="block">
                <SidebarMenuButton
                  isActive={isActive}
                  tooltip={item.label}
                >
                  <Icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
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
};

export default StudentSidebar;
