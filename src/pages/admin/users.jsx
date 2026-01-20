import { AppHeader } from "../../components/app-header/AppHeader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Download, FileUp, MoreHorizontal, PlusCircle, UserPlus, FileText, X, Loader2 } from "lucide-react";
import { useState, useTransition, useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { useToast } from "../../hooks/use-toast";

const initialTpos = [
  { name: "John Doe", email: "john.doe@example.com", department: "TPO", status: "Active" },
  { name: "Jane Smith", email: "jane.smith@example.com", department: "TPO", status: "Inactive" },
];

const initialStudents = [
  { name: "Alex Ray", regNo: "STU123", branch: "CSE", batch: "2025", status: "Not Placed", email: "alex@example.com" },
  { name: "Mia Wong", regNo: "STU124", branch: "ECE", batch: "2025", status: "Placed", email: "mia@example.com" },
  { name: "Ben Stone", regNo: "STU125", branch: "CSE", batch: "2024", status: "Blocked", email: "ben@example.com" },
];


const branches = [
  { value: "mca", label: "MCA" },
  { value: "bca", label: "BCA" },
  { value: "cse", label: "Computer Science" },
  { value: "it", label: "Information Technology" },
  { value: "ece", label: "Electronics" },
  { value: "eee", label: "Electrical Engineering" },
  { value: "me", label: "Mechanical" },
  { value: "ce", label: "Civil Engineering" },
  { value: "ba", label: "BA" },
  { value: "bsc", label: "BSc" }
];

export default function UserManagementPage() {
  const [tpos, setTpos] = useState(initialTpos);
  const [students, setStudents] = useState(initialStudents);

  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [tpoModalOpen, setTpoModalOpen] = useState(false);
  const [bulkUploadModalOpen, setBulkUploadModalOpen] = useState(false);

  const [modalMode, setModalMode] = useState("add");
  const [bulkUploadUserType, setBulkUploadUserType] = useState("Student");

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTpo, setSelectedTpo] = useState(null);

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

  function AcademicUpload() {
    const [file, setFile] = useState(null);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const expectedColumns = "RegNo, CGPA, Backlogs, AcademicYear";

    const handleFileChange = (e) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        const allowedExtensions = [".xlsx", ".xls", ".csv"];
        const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf("."));
        if (allowedExtensions.includes(fileExtension.toLowerCase())) {
          setFile(selectedFile);
        } else {
          toast({
            variant: "destructive",
            title: "Invalid File Type",
            description: "Please upload a .xlsx, .xls, or .csv file.",
          });
          e.target.value = "";
        }
      }
    };

    const handleUpload = () => {
      if (!file) {
        toast({ variant: "destructive", title: "No File Selected", description: "Please select a file to upload." });
        return;
      }
      startTransition(() => {
        setTimeout(() => {
          toast({ title: "Upload Successful", description: `${file.name} has been processed.` });
          setFile(null);
        }, 1500);
      });
    };

    return (
      <div className="space-y-4">
        {file ? (
          <div className="space-y-4">
            <p className="text-sm font-medium">Uploaded File</p>
            <div className="flex items-center justify-between rounded-md border p-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">{file.name}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setFile(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <Label
            htmlFor="academic-data-upload"
            className="flex h-32 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border text-center"
          >
            <div className="space-y-1">
              <FileUp className="mx-auto h-8 w-8 text-muted-foreground" />
              <p>Click to upload or drag & drop</p>
              <p className="text-xs text-muted-foreground">XLSX, XLS, or CSV file</p>
            </div>
            <Input
              id="academic-data-upload"
              type="file"
              className="hidden"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
            />
          </Label>
        )}

        <div className="flex gap-4">
          <Button variant="outline" className="flex-1 flex items-center justify-center gap-2" asChild>
            <a href="/sample-template.xlsx" download className="flex-1 flex items-center justify-center gap-2">
              <Download className="h-4 w-4" />
              Download Sample Template
            </a>
          </Button>

          <Button onClick={handleUpload} disabled={isPending} className="flex-1 flex items-center justify-center gap-2">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Upload Data
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">Expected columns: {expectedColumns}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader title="User Management" description="Manage TPO, student, and academic data." />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Tabs defaultValue="students">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="tpos">TPOs</TabsTrigger>
            <TabsTrigger value="data-upload">Academic Data</TabsTrigger>
          </TabsList>
          <TabsContent value="students" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
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
                <div className="flex items-center gap-4 pt-4">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cse">CSE</SelectItem>
                      <SelectItem value="ece">ECE</SelectItem>
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
                    {students.map(student => (
                      <TableRow key={student.regNo}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.regNo}</TableCell>
                        <TableCell>{student.branch}</TableCell>
                        <TableCell>{student.batch}</TableCell>
                        <TableCell>
                          <Badge variant={student.status === "Placed" ? "default" : student.status === "Blocked" ? "destructive" : "secondary"}>{student.status}</Badge>
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
                              <DropdownMenuItem>
                                {student.status !== 'Blocked' ? 'Deactivate Account' : 'Activate Account'}
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
          <TabsContent value="tpos" className="mt-6">
            <Card>
              <CardHeader className="flex items-center justify-between">
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
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tpos.map(tpo => (
                      <TableRow key={tpo.email}>
                        <TableCell className="font-medium">{tpo.name}</TableCell>
                        <TableCell>{tpo.email}</TableCell>
                        <TableCell>{tpo.department}</TableCell>
                        <TableCell>
                          <Badge variant={tpo.status === "Active" ? "default" : "destructive"}>{tpo.status}</Badge>
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
                                {tpo.status === 'Active' ? 'Deactivate' : 'Activate'}
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
        key={selectedStudent?.regNo || 'add-student'}
        open={studentModalOpen}
        onOpenChange={setStudentModalOpen}
        mode={modalMode}
        student={selectedStudent}
        onSuccess={() => setStudentModalOpen(false)}
      />

      <TpoDialog
        key={selectedTpo?.email || 'add-tpo'}
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

// Reusable Dialog for Add/View/Update Student
const studentSchema = z.object({
  name: z.string().min(1, "Student name is required."),
  regNo: z.string().min(1, "Registration number is required."),
  email: z.string().email("Invalid email address."),
  branch: z.string().min(1, "Please select a department."),
  batch: z.string().min(4, "Batch year is required.").max(4, "Batch must be a 4-digit year."),
  status: z.enum(["active", "inactive"]),
});

// Reusable Dialog for Add / View / Update Student
function StudentDialog({ open, onOpenChange, mode, student, onSuccess }) {
  const isViewMode = mode === "view"

  const title =
    mode === "add"
      ? "Add New Student"
      : mode === "edit"
        ? "Update Student Profile"
        : "View Student Profile"

  const description =
    mode === "add"
      ? "Enter the details for the new student."
      : "View or modify student details."

  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const formId = useId();

  const form = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: student?.name || '',
      regNo: student?.regNo || '',
      email: student?.email || '',
      branch: student?.branch.toLowerCase() || '',
      batch: student?.batch || '',
      status: student?.status === 'Blocked' || student?.status === 'Not Placed' ? 'active' : 'active'
    },
  });

  useEffect(() => {
    form.reset({
      name: student?.name || '',
      regNo: student?.regNo || '',
      email: student?.email || '',
      branch: student?.branch.toLowerCase() || '',
      batch: student?.batch || '',
      status: student?.status === 'Blocked' || student?.status === 'Not Placed' ? 'active' : 'active'
    })
  }, [student, form])

  const onSubmit = (data) => {
    startTransition(() => {
      // Simulate API call
      setTimeout(() => {
        toast({
          title: `Student ${mode === 'add' ? 'Added' : 'Updated'}`,
          description: `Details for ${data.name} have been saved successfully.`,
        });
        onSuccess();
      }, 1000);
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-headline">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)} className="flex-1 overflow-y-auto thin-scrollbar">
            <div className="grid gap-4 px-6 py-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel required>Student Name</FormLabel>
                  <FormControl><Input {...field} readOnly={isViewMode} placeholder="e.g., Alex Ray" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="regNo" render={({ field }) => (
                <FormItem>
                  <FormLabel required>Registration Number</FormLabel>
                  <FormControl><Input {...field} readOnly={isViewMode || mode === 'edit'} placeholder="e.g., STU123" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel required>Email</FormLabel>
                  <FormControl><Input {...field} type="email" readOnly={isViewMode} placeholder="e.g., alex@example.com" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="branch" render={({ field }) => (
                <FormItem>
                  <FormLabel required>Department / Branch</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isViewMode}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch.value} value={branch.value}>
                          {branch.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="batch" render={({ field }) => (
                <FormItem>
                  <FormLabel required>Batch / Academic Year</FormLabel>
                  <FormControl><Input {...field} readOnly={isViewMode} placeholder="e.g., 2025" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Status</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4" disabled={isViewMode}>
                      <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="active" /></FormControl><Label className="font-normal">Active</Label></FormItem>
                      <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="inactive" /></FormControl><Label className="font-normal">Inactive</Label></FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

          </form>
        </Form>

        {!isViewMode && (
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" form={formId} disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog >
  )
}

const tpoSchema = z.object({
  name: z.string().min(1, "TPO name is required."),
  email: z.string().email("Invalid email address."),
  status: z.enum(["active", "inactive"]),
});

// Reusable Dialog for Add/View TPO
function TpoDialog({ open, onOpenChange, mode, tpo, onSuccess }) {
  const isViewMode = mode === "view"

  const title = mode === "add" ? "Add New TPO" : "View TPO Profile"
  const description =
    mode === "add"
      ? "Enter the details for the new TPO."
      : "TPO user details."

  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const formId = useId();

  const form = useForm({
    resolver: zodResolver(tpoSchema),
    defaultValues: {
      name: tpo?.name || '',
      email: tpo?.email || '',
      status: tpo?.status.toLowerCase()
    },
  });

  useEffect(() => {
    form.reset({
      name: tpo?.name || '',
      email: tpo?.email || '',
      status: tpo?.status.toLowerCase()
    })
  }, [tpo, form])

  const onSubmit = (data) => {
    startTransition(() => {
      setTimeout(() => {
        toast({
          title: 'TPO Added',
          description: `TPO account for ${data.name} has been created.`,
        });
        onSuccess();
      }, 1000);
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-headline">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)} className="flex-1 overflow-y-auto thin-scrollbar">
            <div className="grid gap-4 px-6 py-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel required>TPO Name</FormLabel>
                  <FormControl><Input {...field} readOnly={isViewMode} placeholder="e.g., Jane Doe" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel required>Email</FormLabel>
                  <FormControl><Input {...field} type="email" readOnly={isViewMode} placeholder="e.g., jane.doe@example.com" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormItem>
                <Label>Department</Label>
                <Input defaultValue={"TPO"} readOnly />
              </FormItem>

              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Status</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4" disabled={isViewMode}>
                      <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="active" /></FormControl><Label className="font-normal">Active</Label></FormItem>
                      <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="inactive" /></FormControl><Label className="font-normal">Inactive</Label></FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </form>
        </Form>
        {!isViewMode && (
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" form={formId} disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save TPO
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog >
  )
}

// Reusable Dialog for Bulk Upload
function BulkUploadDialog({ open, onOpenChange, userType }) {
  const title = `Bulk ${userType} Upload`
  const description = `Upload an Excel file to add multiple ${userType.toLowerCase()}s at once.`

  const expectedColumns =
    userType === "Student"
      ? "RegNo, Name, Email, Department, Batch, CGPA, Backlogs"
      : "Name, Email, Department"

  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const allowedExtensions = ['.xlsx', '.xls', '.csv'];
      const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.'));

      if (allowedExtensions.includes(fileExtension.toLowerCase())) {
        setFile(selectedFile);
      } else {
        toast({ variant: 'destructive', title: 'Invalid File Type', description: 'Please upload a .xlsx, .xls, or .csv file.' });
        e.target.value = '';
      }
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({ variant: 'destructive', title: 'No File Selected', description: 'Please select a file to upload.' });
      return;
    }
    startTransition(() => {
      setTimeout(() => {
        toast({
          title: 'Upload Successful',
          description: `${file.name} has been processed.`,
        });
        onOpenChange(false);
        setFile(null);
      }, 1500);
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-headline">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4 thin-scrollbar">
          {file ? (
            <div className="space-y-4">
              <p className="text-sm font-medium">Uploaded File</p>
              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setFile(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <Label
              htmlFor={`bulk-${userType}-upload`}
              className="flex h-32 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border text-center"
            >
              <div className="space-y-1">
                <FileUp className="mx-auto h-8 w-8 text-muted-foreground" />
                <p>Click to upload or drag & drop</p>
                <p className="text-xs text-muted-foreground">
                  XLSX, XLS, or CSV file
                </p>
              </div>
              <Input
                id={`bulk-${userType}-upload`}
                type="file"
                className="hidden"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
              />
            </Label>
          )}
          <Button variant="outline" className="w-full flex items-center justify-center gap-2" asChild>
            <a href="/sample-template.xlsx" download className="w-full flex items-center justify-center gap-2">
              <Download className="mr-2 h-4 w-4" />
              Download Sample Template
            </a>
          </Button>

          <p className="text-sm text-muted-foreground">
            Expected columns: {expectedColumns}
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleUpload} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Upload Data
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}