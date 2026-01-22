"use client";

import { useState } from "react";
import { Download, MoreHorizontal, Users } from "lucide-react";

import { AppHeader } from "../../components/app-header/AppHeader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Textarea } from "../../components/ui/textarea";
import { EmptyState } from "../../components/empty-state";
import { useToast } from "../../hooks/use-toast";

/* ---------- DATA ---------- */

const initialStudents = [
  {
    name: "Alex Ray",
    regNo: "STU123",
    branch: "CSE",
    batch: "2025",
    status: "Not Placed",
    email: "alex.ray@example.com",
    cgpa: 7.8,
    backlogs: 1,
  },
  {
    name: "Mia Wong",
    regNo: "STU124",
    branch: "ECE",
    batch: "2025",
    status: "Placed",
    company: "Innovatech Solutions",
    email: "mia.wong@example.com",
    cgpa: 9.2,
    backlogs: 0,
  },
  {
    name: "Leo Kim",
    regNo: "STU125",
    branch: "ME",
    batch: "2024",
    status: "Not Placed",
    email: "leo.kim@example.com",
    cgpa: 8.1,
    backlogs: 0,
  },
];

/* ---------- PAGE ---------- */

export default function TpoStudentsPage() {
  const [students] = useState(initialStudents);
  const [viewProfileModalOpen, setViewProfileModalOpen] = useState(false);
  const [viewResumeModalOpen, setViewResumeModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
    setViewProfileModalOpen(true);
  };

  const handleViewResume = (student) => {
    setSelectedStudent(student);
    setViewResumeModalOpen(true);
  };

  const handleProvideFeedback = (student) => {
    setSelectedStudent(student);
    setFeedbackModalOpen(true);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader title="Student List" description="View and manage student information." />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Students</CardTitle>

            <div className="flex items-center gap-4 pt-4">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cse">CSE</SelectItem>
                  <SelectItem value="ece">ECE</SelectItem>
                  <SelectItem value="me">ME</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            {students.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Reg. No</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.regNo}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.regNo}</TableCell>
                      <TableCell>{student.branch}</TableCell>
                      <TableCell>{student.batch}</TableCell>
                      <TableCell>
                        <Badge variant={student.status === "Placed" ? "default" : "secondary"}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => handleViewProfile(student)}>
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => handleViewResume(student)}>
                              View Resume
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => handleProvideFeedback(student)}>
                              Provide Feedback
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <EmptyState
                icon={Users}
                title="No Students Found"
                description="Student records managed by the admin will appear here."
              />
            )}
          </CardContent>
        </Card>
      </main>

      <ViewProfileDialog
        open={viewProfileModalOpen}
        onOpenChange={setViewProfileModalOpen}
        student={selectedStudent}
      />

      <ViewResumeDialog
        open={viewResumeModalOpen}
        onOpenChange={setViewResumeModalOpen}
        student={selectedStudent}
      />

      <ProvideFeedbackDialog
        open={feedbackModalOpen}
        onOpenChange={setFeedbackModalOpen}
        student={selectedStudent}
      />
    </div>
  );
}

/* ---------- DIALOGS ---------- */

function ViewProfileDialog({ open, onOpenChange, student }) {
  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline">Student Profile</DialogTitle>
          <DialogDescription>Read-only view of student details.</DialogDescription>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6 thin-scrollbar">
          <section>
            <h3 className="font-semibold border-b pb-2 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={student.name} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={student.email} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Registration Number</Label>
                <Input value={student.regNo} readOnly />
              </div>
            </div>
          </section>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ViewResumeDialog({ open, onOpenChange, student }) {
  if (!student) return null;

  const resumeUrl =
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline">Student Resume</DialogTitle>
          <DialogDescription>
            {student.name} ({student.regNo})
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 min-h-0">
          <iframe src={resumeUrl} className="w-full h-full border-0" title="Resume" />
        </div>

        <DialogFooter>
          <Button variant="outline" asChild>
            <a href={resumeUrl} download>
              <Download className="mr-2 h-4 w-4" />
              Download
            </a>
          </Button>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ProvideFeedbackDialog({ open, onOpenChange, student }) {
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  if (!student) return null;

  const handleSendFeedback = () => {
    toast({ title: "Feedback sent successfully to the student" });
    setFeedback("");
    onOpenChange(false);
  };

  const isInvalid = feedback.trim().length < 10 || feedback.trim().length > 500;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-headline">Provide Feedback</DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-0 space-y-4">
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={6}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSendFeedback} disabled={isInvalid}>
            Send Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
