import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Users, Building, Briefcase, GraduationCap, Trophy } from "lucide-react";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppHeader } from "../../components/app-header/AppHeader";
import { Table, TableBody, TableCell, TableRow } from "../../components/ui/table";
import { ChartContainer, ChartTooltipContent } from "../../components/ui/chart";

/* DATA */
const branchPlacementData = [
  { name: "CSE", placed: 80 },
  { name: "IT", placed: 70 },
  { name: "ECE", placed: 60 },
  { name: "ME", placed: 40 },
  { name: "CE", placed: 30 },
];

const recentActivities = [
  { action: "New company 'Innovatech' was added.", time: "5m ago" },
  { action: "Student data for 2025 batch was uploaded.", time: "1h ago" },
  { action: "Announcement sent for 'Quantum' campus drive.", time: "3h ago" },
  { action: "TPO account for 'Jane Smith' was deactivated.", time: "1d ago" },
  { action: "Report for branch-wise placement was downloaded.", time: "2d ago" },
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader
        title="Admin Dashboard"
        description="Manage students, companies, and track placement statistics."
      />

      <main className="flex flex-1 flex-col gap-6 p-6">

        {/* STATS */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <StatCard title="Total Students" value="1,254" icon={Users} />
          <StatCard title="Total Placed" value="450" icon={GraduationCap} />
          <StatCard title="Companies" value="72" icon={Building} />
          <StatCard title="Active Drives" value="5" icon={Briefcase} />
          <StatCard title="Avg / Highest Package" value="8 / 25 LPA" icon={Trophy} />
        </div>

        {/* CHART + ACTIVITY */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Branch-wise Placements</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[300px]">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={branchPlacementData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="placed" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Last system actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  {recentActivities.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <p className="font-medium">{item.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.time}
                        </p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

      </main>
    </div>
  );
}

/* REUSABLE CARD */
function StatCard({ title, value, icon: Icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
