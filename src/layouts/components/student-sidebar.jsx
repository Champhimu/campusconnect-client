"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "../../components/ui/sidebar";

import { Logo } from "../../components/logo";

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

/* Sidebar menu items */
const menuItems = [
  { href: "/student/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "profile", icon: User, label: "My Profile" },
  { href: "/student/resume", icon: Upload, label: "Resume & Skills" },
  { href: "/student/jobs", icon: Briefcase, label: "Jobs" },
  { href: "/student/application-status", icon: FileText, label: "Application Status" },
  { href: "/student/resume-score", icon: Wand2, label: "AI Resume Score" },
  { href: "/student/placement-history", icon: History, label: "Placement History" },
  { href: "/student/notifications", icon: Bell, label: "Notifications" },
];

export default function StudentSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      {/* Main menu */}
      <SidebarMenu className="flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
                >
                  <Icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
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
