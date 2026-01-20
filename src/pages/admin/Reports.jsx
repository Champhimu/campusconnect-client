import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { ChartContainer, ChartTooltipContent } from "../../components/ui/chart";
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from "recharts";
import { AppHeader } from "../../components/app-header/AppHeader";
import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Download } from "lucide-react";

const branchPlacementData = [
  { name: "CSE", placed: 80 },
  { name: "IT", placed: 70 },
  { name: "ECE", placed: 60 },
  { name: "ME", placed: 40 },
  { name: "CE", placed: 30 },
];

const companyReportData = [
  { company: "Innovatech", selected: 25, avgSalary: "12 LPA" },
  { company: "Quantum", selected: 15, avgSalary: "15 LPA" },
  { company: "NexGen", selected: 20, avgSalary: "10 LPA" },
];

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader
        title="Reports"
        description="Generate and download placement reports."
      />

      <main className="flex flex-1 flex-col gap-8 p-4 md:p-8">

        {/* Branch-wise Report */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Branch-wise Report</CardTitle>
              <CardDescription>Number of students placed per branch.</CardDescription>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </CardHeader>

          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart data={branchPlacementData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip content={<ChartTooltipContent />} />
                 <Bar
                    dataKey="placed"
                    radius={4}
                    fill="hsl(var(--primary))"
                  />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Company-wise Report */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Company-wise Report</CardTitle>
              <CardDescription>
                Students selected and average salary per company.
              </CardDescription>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Students Selected</TableHead>
                  <TableHead>Average Salary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companyReportData.map((row) => (
                  <TableRow key={row.company}>
                    <TableCell>{row.company}</TableCell>
                    <TableCell>{row.selected}</TableCell>
                    <TableCell>{row.avgSalary}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </main>
    </div>
  );
}
