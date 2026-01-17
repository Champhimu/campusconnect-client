// "use client";

// import { AppHeader } from "../../components/app-header/AppHeader";
// import { Button } from "../../components/ui/button";
// import { TpoSidebar } from "../../layouts/components/tpo-sidebar";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../../components/ui/card";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../../components/ui/table";

// import { Briefcase, Download, GraduationCap, Users } from "lucide-react";

// export default function Dashboard() {
//   const recentlyPlaced = [
//     {
//       name: "Mia Wong",
//       company: "Innovatech Solutions",
//       role: "Software Engineer",
//       salary: "15 LPA",
//     },
//     {
//       name: "John Smith",
//       company: "Quantum Dynamics",
//       role: "Data Scientist",
//       salary: "18 LPA",
//     },
//   ];

//   return (
//     <div className="flex min-h-screen w-full">
//       {/* SIDEBAR */}
//       <TpoSidebar />

//       {/* MAIN CONTENT */}
//       <div className="flex flex-1 flex-col">
//         <AppHeader
//           title="TPO Dashboard"
//           description="Oversee and manage placement activities."
//         />

//         <main className="flex flex-1 flex-col gap-8 p-4 md:p-8">
//           {/* STATS */}
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between pb-2">
//                 <CardTitle className="text-sm font-medium">
//                   Eligible Students
//                 </CardTitle>
//                 <Users className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">850</div>
//                 <p className="text-xs text-muted-foreground">
//                   out of 1254 students
//                 </p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between pb-2">
//                 <CardTitle className="text-sm font-medium">
//                   Active Jobs
//                 </CardTitle>
//                 <Briefcase className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">15</div>
//                 <p className="text-xs text-muted-foreground">
//                   from 5 companies
//                 </p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between pb-2">
//                 <CardTitle className="text-sm font-medium">
//                   Upcoming Drives
//                 </CardTitle>
//                 <GraduationCap className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">3</div>
//                 <p className="text-xs text-muted-foreground">
//                   in the next 7 days
//                 </p>
//               </CardContent>
//             </Card>
//           </div>

//           {/* TABLES */}
//           <div className="grid gap-8 lg:grid-cols-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="font-headline">
//                   Upcoming Drives
//                 </CardTitle>
//                 <CardDescription>
//                   Scheduled campus recruitment drives.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Company</TableHead>
//                       <TableHead>Role</TableHead>
//                       <TableHead>Date</TableHead>
//                       <TableHead>Package</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     <TableRow>
//                       <TableCell className="font-medium">
//                         Quantum Dynamics
//                       </TableCell>
//                       <TableCell>Quantum Researcher</TableCell>
//                       <TableCell>Oct 28, 2024</TableCell>
//                       <TableCell>22 LPA</TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between">
//                 <div>
//                   <CardTitle className="font-headline">
//                     Recently Placed Students
//                   </CardTitle>
//                   <CardDescription>
//                     Latest successful placements.
//                   </CardDescription>
//                 </div>
//                 <Button variant="outline" size="sm">
//                   <Download className="mr-2 h-4 w-4" />
//                   Export
//                 </Button>
//               </CardHeader>
//               <CardContent>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Student</TableHead>
//                       <TableHead>Company</TableHead>
//                       <TableHead>Role</TableHead>
//                       <TableHead>Package</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {recentlyPlaced.map((s, i) => (
//                       <TableRow key={i}>
//                         <TableCell className="font-medium">
//                           {s.name}
//                         </TableCell>
//                         <TableCell>{s.company}</TableCell>
//                         <TableCell>{s.role}</TableCell>
//                         <TableCell>{s.salary}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

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
import { Briefcase, Download, GraduationCap, Users } from "lucide-react";

export default function Dashboard() {
  const recentlyPlaced = [
    { name: "Mia Wong", company: "Innovatech Solutions", role: "Software Engineer", salary: "15 LPA" },
    { name: "John Smith", company: "Quantum Dynamics", role: "Data Scientist", salary: "18 LPA" },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader
        title="TPO Dashboard"
        description="Oversee and manage placement activities."
      />

      <main className="flex flex-1 flex-col gap-8 p-4 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Eligible Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">850</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Drives</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recently Placed Students</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Export
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
                {recentlyPlaced.map((s, i) => (
                  <TableRow key={i}>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.company}</TableCell>
                    <TableCell>{s.role}</TableCell>
                    <TableCell>{s.salary}</TableCell>
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

