import { useEffect, useState } from "react";
import { AppHeader } from "../../components/app-header/AppHeader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
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
import { MoreHorizontal, Download, Users } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "../../redux/slices/admin/userMgmtSlice";
import branches from "../../lib/branches.json";
import { SparrowLoader } from "../../components/sparrow-loader";
import { EmptyState } from "../../components/empty-state";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "../../components/ui/dialog";
import { Textarea } from "../../components/ui/textarea";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useToast } from "../../hooks/use-toast";

export default function TpoStudentsPage() {
  const dispatch = useDispatch();
  const { students, loading } = useSelector(state => state.admin);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewProfileModalOpen, setViewProfileModalOpen] = useState(false);
  const [viewResumeModalOpen, setViewResumeModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

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
      <AppHeader
        title="Student List"
        description="View and manage student information."
      />

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
                    {branches.map((branch) => (
                      <SelectItem key={branch.value} value={branch.value}> {branch.label} </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>
          </CardHeader>

          {loading && (
            <div className="flex justify-center py-10">
              <SparrowLoader text="Loading students..." />
            </div>
          )}
          <CardContent>
            {!loading && students && students.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Reg. No</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Placement</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.registrationNumber}>
                    <TableCell>{student?.userId.name}</TableCell>
                    <TableCell>{student.registrationNumber}</TableCell>
                    <TableCell>{student.branch}</TableCell>
                    <TableCell>{student.academicYear}</TableCell>
                    <TableCell>
                      <Badge variant={student.placementStatus === "PLACED" ? "default" : "secondary"}>
                        {student.placementStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={student?.userId.isActive ? "default" : "destructive"}>
                        {student?.userId.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onSelect={() => handleViewProfile(student)}>View Profile</DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => handleViewResume(student)}>View Resume</DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => handleProvideFeedback(student)}>Provide Feedback</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table> ) : (
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
                                <Input value={student.userId.name} readOnly />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input value={student.userId.email} readOnly />
                            </div>
                            <div className="space-y-2">
                                <Label>Registration Number</Label>
                                <Input value={student.registrationNumber} readOnly />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="font-semibold border-b pb-2 my-4">Academic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Department / Branch</Label>
                                <Input value={student.branch} readOnly />
                            </div>
                            <div className="space-y-2">
                                <Label>Batch / Graduation Year</Label>
                                <Input value={student.academicYear} readOnly />
                            </div>
                            <div className="space-y-2">
                                <Label>CGPA</Label>
                                <Input value={student.cgpa.toString()} readOnly />
                            </div>
                            <div className="space-y-2">
                                <Label>Backlogs</Label>
                                <Input value={student.backlogs.toString()} readOnly />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="font-semibold border-b pb-2 my-4">Placement Status</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Input value={student.placementStatus} readOnly />
                            </div>
                            {student.status === "Placed" && (
                                <div className="space-y-2">
                                    <Label>Placed Company</Label>
                                    <Input value={student.company} readOnly />
                                </div>
                            )}
                        </div>
                    </section>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
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