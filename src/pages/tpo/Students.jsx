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
import { Inbox, MoreHorizontal } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "../../redux/slices/admin/userMgmtSlice";
import branches from "../../lib/branches.json";
import { StudentDialog } from "../../components/company/StudentDialog";
import { SparrowLoader } from "../../components/sparrow-loader";
import { EmptyState } from "../../components/empty-state";

export default function TpoStudentsPage() {
  const dispatch = useDispatch();
  const {students, loading } = useSelector(state => state.admin);
  const [modalMode, setModalMode] = useState("add");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentModalOpen, setStudentModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleOpenStudentModal = (mode, student) => {
    setModalMode(mode);
    setSelectedStudent(student || null);
    setStudentModalOpen(true);
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
            {loading ? (<div className="flex justify-center py-10">
      <SparrowLoader text="Loading students..." />
    </div>) : students && students?.length > 0 ? (<>
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
            </>) : (<><div className="py-10 w-full">
      <EmptyState
        className="w-full"
        icon={Inbox}
        title="No Students Yet"
        description="There are currently no students added. Once students are added, they will appear here."
      />
    </div></>)}
          </CardHeader>

          <CardContent>
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
                        <DropdownMenuItem onSelect={() => handleOpenStudentModal('view', student)}>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>View Resume</DropdownMenuItem>
                        <DropdownMenuItem>Provide Feedback</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <StudentDialog
        open={studentModalOpen}
        onOpenChange={setStudentModalOpen}
        mode={modalMode}
        student={selectedStudent}
        onSuccess={() => setStudentModalOpen(false)}
      />
    </div>
  );
}
