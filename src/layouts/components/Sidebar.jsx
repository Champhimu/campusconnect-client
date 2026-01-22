import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building,
  Briefcase,
  Users,
  LifeBuoy,
  Settings,
  MailPlus,
} from "lucide-react";

const menuItems = [
  { path: "/company", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/company/profile", icon: Building, label: "Company Profile" },
  { path: "/company/jobs", icon: Briefcase, label:"Active Jobs" },
  { path: "/company/applicants", icon: Users, label: "Applicants" },
  { path: "/company/invites", icon: MailPlus, label: "Institute Invites" },
];

function Sidebar() {
    const location = useLocation();

    return (
      <Sidebar>
        {/* Header */}
        <SidebarHeader>
          <Logo />

          <div className="mt-4 rounded-md bg-muted p-3">
          <p className="text-sm font-medium">
            {"Person Name"}
          </p>
          <p className="text-xs text-muted-foreground">
            {"HR"}
          </p>
          <p className="text-xs text-muted-foreground">
            {"Institute Name"}
          </p>
        </div>

        </SidebarHeader>

        {/* Main menu */}
        <SidebarMenu className="flex-1">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <SidebarMenuItem key={item.path}>
                <NavLink 
                key={item.path}
                to={item.path}
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

export default Sidebar;