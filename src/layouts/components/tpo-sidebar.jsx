
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

export function TpoSidebar() {
  const location = useLocation();

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
