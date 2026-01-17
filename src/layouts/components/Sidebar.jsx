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
  { path: "/dashboard/company", icon: LayoutDashboard, label: "Dashboard" },
  { path: "profile", icon: Building, label: "Company Profile" },
  { path: "/company/jobs", icon: Briefcase, label: "Job Postings" },
  { path: "/company/applicants", icon: Users, label: "Applicants" },
  { path: "/company/invites", icon: MailPlus, label: "Institute Invites" },
];

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r flex flex-col">
      {/* HEADER */}
      <div className="px-6 py-4 text-xl font-bold border-b">
        CampusConnect
      </div>

      {/* MENU */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="border-t p-3 space-y-1">
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-gray-100">
          <LifeBuoy className="h-4 w-4" />
          Help
        </button>

        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-gray-100">
          <Settings className="h-4 w-4" />
          Settings
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
