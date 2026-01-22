import { NavLink, useLocation } from "react-router-dom"
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
import { useSelector } from "react-redux"

const menuItems = [
  { href: "/company", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/company/profile", icon: Building, label: "Company Profile" },
  { href: "/company/jobs", icon: Briefcase, label: "Job Postings" },
  { href: "/company/applicants", icon: Users, label: "Applicants" },
  { href: "/company/invites", icon: MailPlus, label: "Institute Invites" },
  { href: "/company/notifications", icon: Bell, label: "Notifications" },
]

export function CompanySidebar() {
    const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader>
        <Logo />
        <div className="mt-4 rounded-md bg-muted p-3">
          <p className="text-sm font-medium">
            {user.name || "HR Name"}
          </p>
          <p className="text-xs text-muted-foreground">
            {"HR"}
          </p>
          <p className="text-xs text-muted-foreground">
            {user.organization.companyName || "Company Name"}
          </p>
        </div>
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
