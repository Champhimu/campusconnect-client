import { Link, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "../../components/ui/sidebar"
import Logo from "../../components/logo/Logo"
import {
  LayoutDashboard,
  Building,
  Briefcase,
  Users,
  LifeBuoy,
  Settings,
  Bell,
  MailPlus,
} from "lucide-react"

const menuItems = [
  { href: "/company", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/company/profile", icon: Building, label: "Company Profile" },
  { href: "/company/jobs", icon: Briefcase, label: "Job Postings" },
  { href: "/company/applicants", icon: Users, label: "Applicants" },
  { href: "/company/invites", icon: MailPlus, label: "Institute Invites" },
  { href: "/company/notifications", icon: Bell, label: "Notifications" },
]

export function CompanySidebar() {
  const { pathname } = useLocation()

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      <SidebarMenu className="flex-1">
        {menuItems.map(item => (
          <SidebarMenuItem key={item.href}>
            <Link to={item.href}>
              <SidebarMenuButton key={item.href}
                isActive={pathname.startsWith(item.href)}
                tooltip={item.label}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
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
  )
}
