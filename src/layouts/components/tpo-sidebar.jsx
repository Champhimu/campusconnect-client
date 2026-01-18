
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
    <aside className="h-screen w-64 border-r bg-background flex flex-col"> {/* 👈 ADD flex flex-col */}
      
      <div className="border-b p-4 text-lg font-bold">
        CampusConnect
      </div>

      <nav className="p-2 flex flex-col gap-1">
        {menuItems.map((item) => {
          const active = location.pathname.startsWith(item.to);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm
              ${active ? "bg-muted font-medium" : "hover:bg-muted text-muted-foreground"}`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* 👇 THIS PART WILL STAY AT BOTTOM */}
      <div className="border-t p-2 mt-auto">
        <button className="flex w-full items-center gap-3 px-3 py-2 hover:bg-muted">
          <LifeBuoy className="h-4 w-4" /> Help
        </button>
        <button className="flex w-full items-center gap-3 px-3 py-2 hover:bg-muted">
          <Settings className="h-4 w-4" /> Settings
        </button>
      </div>
    </aside>
  );
}
