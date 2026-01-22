import React from "react";

// App Header
import { AppHeader } from "../../components/app-header/AppHeader";

// UI Components
import { Badge } from "../../components/ui/badge";
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

// Data
import { companies, jobs } from "../../lib/data";
import { PlaceHolderImages } from "../../lib/placeholder-images";

// Icons
import {
  Briefcase,
  Download,
  GraduationCap,
  Users,
} from "lucide-react";

function TpoDashboardPage() {
  const recentlyPlaced = [
    {
      name: "Mia Wong",
      company: "Innovatech Solutions",
      role: "Software Engineer",
      salary: "15 LPA",
    },
    {
      name: "John Smith",
      company: "Quantum Dynamics",
      role: "Data Scientist",
      salary: "18 LPA",
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader
        title="TPO Dashboard"
        description="Oversee and manage placement activities."
      />

      <main className="flex flex-1 flex-col gap-8 p-4 md:gap-8 md:p-8">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Eligible Students
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">850</div>
              <p className="text-xs text-muted-foreground">
                out of 1254 students
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Jobs
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">
                from 5 companies
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Drives
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                in the next 7 days
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tables */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Upcoming Drives */}
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">
                Upcoming Drives
              </CardTitle>
              <CardDescription>
                Scheduled campus recruitment drives.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Package</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Quantum Dynamics
                    </TableCell>
                    <TableCell>Quantum Researcher</TableCell>
                    <TableCell>Oct 28, 2024</TableCell>
                    <TableCell>22 LPA</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      NexGen Robotics
                    </TableCell>
                    <TableCell>Robotics Engineer</TableCell>
                    <TableCell>Nov 5, 2024</TableCell>
                    <TableCell>16 LPA</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recently Placed */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline">
                  Recently Placed Students
                </CardTitle>
                <CardDescription>
                  Latest successful placements.
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Package</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentlyPlaced.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>{student.company}</TableCell>
                      <TableCell>{student.role}</TableCell>
                      <TableCell>{student.salary}</TableCell>
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

export default TpoDashboardPage;


