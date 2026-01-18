import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Building,
  BarChart,
  BookUser,
  Settings,
  LifeBuoy,
} from "lucide-react";

const menuItems = [
  { to: "/dashboard/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/dashboard/admin/users", icon: Users, label: "Users" },
  { to: "/dashboard/admin/companies", icon: Briefcase, label: "Companies" },
  { to: "/dashboard/admin/company-config", icon: Building, label: "Company Config" },
  { to: "/dashboard/admin/reports", icon: BarChart, label: "Reports" },
  { to: "/dashboard/admin/announcements", icon: BookUser, label: "Announcements" },
];

export function AdminSidebar() {
  return (
    <div className="h-full flex flex-col p-4">
      {/* Logo / Title */}
      <div className="mb-6 text-xl font-bold">
        Admin Panel
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition
               ${isActive ? "bg-muted font-medium" : "text-muted-foreground hover:bg-muted"}`
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto space-y-1">
        <div className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground">
          <LifeBuoy className="h-4 w-4" />
          Help
        </div>
        <div className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground">
          <Settings className="h-4 w-4" />
          Settings
        </div>
      </div>
    </div>
  );
}
