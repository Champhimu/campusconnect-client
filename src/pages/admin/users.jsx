import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppHeader } from "../../components/app-header/AppHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { MoreHorizontal, UserPlus, PlusCircle, FileUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { StudentDialog } from "../../components/company/StudentDialog";
import { TpoDialog } from "../../components/company/TpoDialog";
import { BulkUploadDialog } from "../../components/company/BulkUploadDialog";
import branches from '../../lib/branches.json';
import { fetchStudents, fetchTPOs, clearError, clearSuccess, toggleStudentStatus  } from "../../redux/slices/admin/userMgmtSlice";
import { useToast } from "../../hooks/use-toast";
import { AcademicUpload } from "../../components/company/AcademicUpload";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";

export default function UserManagementPage() {
  const dispatch = useDispatch();
  const { students, tpos, error, success } = useSelector(state => state.admin);
  const { toast } = useToast();

  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [tpoModalOpen, setTpoModalOpen] = useState(false);
  const [bulkUploadModalOpen, setBulkUploadModalOpen] = useState(false);

  const [modalMode, setModalMode] = useState("add");
  const [bulkUploadUserType, setBulkUploadUserType] = useState("Student");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTpo, setSelectedTpo] = useState(null);

  const handleToggleStatus = (userId) => {
    dispatch(toggleStudentStatus(userId));
  };

  useEffect(() => {
    dispatch(fetchTPOs());
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast({ title: "Success", description: success });
      dispatch(clearSuccess());
    }
  }, [success, dispatch, toast]);

  useEffect(() => {
    if (error) {
      toast({ variant: "destructive", title: "Error", description: error });
      dispatch(clearError());
    }
  }, [error, dispatch, toast]);

  const handleOpenStudentModal = (mode, student) => {
    setModalMode(mode);
    setSelectedStudent(student || null);
    setStudentModalOpen(true);
  };

  const handleOpenTpoModal = (mode, tpo) => {
    setModalMode(mode);
    setSelectedTpo(tpo || null);
    setTpoModalOpen(true);
  };

  const handleOpenBulkUploadModal = (userType) => {
    setBulkUploadUserType(userType);
    setBulkUploadModalOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader title="User Management" description="Manage TPO, student, and academic data." />

      <main className="flex-1 p-4 md:p-8">
        <Tabs defaultValue="students">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="tpos">TPOs</TabsTrigger>
            <TabsTrigger value="data-upload">Academic Data</TabsTrigger>
          </TabsList>

          {/* Student Management */}
          <TabsContent value="students" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="font-headline">Student Management</CardTitle>
                    <CardDescription>Add, view, and manage student data.</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleOpenStudentModal('add')}>
                      <UserPlus className="mr-2 h-4 w-4" /> Add Student
                    </Button>
                    <Button variant="outline" onClick={() => handleOpenBulkUploadModal("Student")}>
                      <FileUp className="mr-2 h-4 w-4" /> Bulk Upload
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4"> <Select> <SelectTrigger className="w-[180px]"> <SelectValue placeholder="Filter by Department" /> </SelectTrigger> <SelectContent> {branches.map((branch) => (<SelectItem key={branch.value} value={branch.value}> {branch.label} </SelectItem>))} {/* <SelectItem value="cse">CSE</SelectItem> <SelectItem value="ece">ECE</SelectItem> */} </SelectContent> </Select> <Select> <SelectTrigger className="w-[180px]"> <SelectValue placeholder="Filter by Year" /> </SelectTrigger> <SelectContent> <SelectItem value="2026">2026</SelectItem> <SelectItem value="2025">2025</SelectItem> <SelectItem value="2024">2024</SelectItem> <SelectItem value="2023">2023</SelectItem> <SelectItem value="2022">2022</SelectItem> </SelectContent> </Select> </div>
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
                    {students.map(student => (
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
                              <DropdownMenuItem onSelect={() => handleOpenStudentModal('edit', student)}>Update Profile</DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => handleToggleStatus(student.userId._id)}>
                                {student.userId.isActive ? 'Deactivate Account' : 'Activate Account'}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TPO Management */}
          <TabsContent value="tpos" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="font-headline">TPO Management</CardTitle>
                    <CardDescription>Add, view, and manage Training & Placement Officers.</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleOpenTpoModal('add')}>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add TPO
                    </Button>
                    <Button variant="outline" onClick={() => handleOpenBulkUploadModal('TPO')}>
                      <FileUp className="mr-2 h-4 w-4" /> Bulk Upload
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tpos.map(tpo => (
                      <TableRow key={tpo.email}>
                        <TableCell>{tpo.name}</TableCell>
                        <TableCell>{tpo.email}</TableCell>
                        <TableCell>{tpo.role}</TableCell>
                        <TableCell>
                          <Badge variant={tpo.isActive ? "default" : "destructive"}>
                            {tpo.isActive ? "Active" : "Inactive"}
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
                              <DropdownMenuItem onSelect={() => handleOpenTpoModal('view', tpo)}>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>
                                {tpo.isActive ? 'Deactivate' : 'Activate'}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Academic Upload Tab */}
          <TabsContent value="data-upload" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Academic Data Upload</CardTitle>
                <CardDescription>Upload student academic data using an Excel sheet.</CardDescription>
              </CardHeader>
              <CardContent>
                <AcademicUpload />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <StudentDialog
        open={studentModalOpen}
        onOpenChange={setStudentModalOpen}
        mode={modalMode}
        student={selectedStudent}
        onSuccess={() => setStudentModalOpen(false)}
      />

      <TpoDialog
        open={tpoModalOpen}
        onOpenChange={setTpoModalOpen}
        mode={modalMode}
        tpo={selectedTpo}
        onSuccess={() => setTpoModalOpen(false)}
      />

      <BulkUploadDialog 
        open={bulkUploadModalOpen} 
        onOpenChange={setBulkUploadModalOpen} 
        userType={bulkUploadUserType} 
      />
    </div>
  );
}
