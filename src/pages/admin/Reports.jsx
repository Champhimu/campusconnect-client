import { AppHeader } from "../../components/app-header/AppHeader";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { Download } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* Dummy Data */
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
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Branch-wise Report</CardTitle>
              <CardDescription>
                Number of students placed per branch
              </CardDescription>
            </div>

            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </CardHeader>

          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchPlacementData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="placed" fill="#2563eb" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Company-wise Report */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Company-wise Report</CardTitle>
              <CardDescription>
                Students selected and average salary
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
                    <TableCell className="font-medium">
                      {row.company}
                    </TableCell>
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
