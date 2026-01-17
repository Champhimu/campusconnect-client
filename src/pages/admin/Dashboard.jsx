"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Users, Building, Briefcase, GraduationCap, Trophy } from "lucide-react";
import { ChartContainer, ChartTooltipContent } from "../../components/ui/chart";
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from "recharts";
import { AppHeader } from "../../components/app-header/AppHeader";
import { Table, TableBody, TableCell, TableRow } from "../../components/ui/table";

const branchPlacementData = [
  { name: "CSE", placed: 80, fill: "hsl(var(--chart-1))" },
  { name: "IT", placed: 70, fill: "hsl(var(--chart-2))" },
  { name: "ECE", placed: 60, fill: "hsl(var(--chart-3))" },
  { name: "ME", placed: 40, fill: "hsl(var(--chart-4))" },
  { name: "CE", placed: 30, fill: "hsl(var(--chart-5))" },
];

const recentActivities = [
  { action: "New company 'Innovatech' was added.", time: "5m ago" },
  { action: "Student data for 2025 batch was uploaded.", time: "1h ago" },
  { action: "Announcement sent for 'Quantum' campus drive.", time: "3h ago" },
  { action: "TPO account for 'Jane Smith' was deactivated.", time: "1d ago" },
  { action: "Report for 'Branch-wise placement' was downloaded.", time: "2d ago" },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader
        title="Admin Dashboard"
        description="Manage students, companies, and track placement statistics."
      />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,254</div>
              <p className="text-xs text-muted-foreground">+50 since last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Placed</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">450</div>
              <p className="text-xs text-muted-foreground">35.8% placement rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Companies</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72</div>
              <p className="text-xs text-muted-foreground">+5 new companies</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Drives</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">2 starting this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg/Highest Package</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">8 / 25 LPA</div>
              <p className="text-xs text-muted-foreground">Average / Highest</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="font-headline">Branch-wise Placements</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer config={{}} className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height={350}>
                  <RechartsBarChart data={branchPlacementData} accessibilityLayer>
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis />
                    <RechartsTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="placed" radius={4} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="font-headline">Recent Activities</CardTitle>
              <CardDescription>Last 5 actions performed in the system.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  {recentActivities.map((activity, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
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
