import React, { useState, useEffect } from "react";

// UI Components
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Textarea } from "../../components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import { Badge } from "../../components/ui/badge";
import axiosInstance from "../../api/axiosInstance.js";
import { AppHeader } from "../../components/app-header/AppHeader";
import { companies, jobs } from "../../lib/data.js";
import { EmptyState } from "../../components/empty-state.js";

// import { jobs } from "../../lib/data.js";
import { PlaceHolderImages } from "../../lib/placeholder-images.js";
import {
  PlusCircle,
  FileUp,
  Send,
  FileText,
  X,
  CheckCircle,
  XCircle,
  Briefcase,
  CircleDollarSign,
  Upload,
  Inbox
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { fetchAvailableCompanies } from "../../redux/slices/collaborationsSlice";
import { useNavigate } from "react-router-dom";
import { fetchSubmittedDrives } from "../../redux/slices/companyDriveSlice.js";
import { setJobForm } from "../../redux/jobFormSlice.js";

function TPOCompaniesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { availableCompanies, loading, error } = useSelector(
    (state) => state.collaborations
  );
  const { user } = useSelector((state) => state.auth);
  const { drives } = useSelector((state) => state.companyDrives);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hiringRequests, setHiringRequests] = useState(initialHiringRequests);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeTab, setActiveTab] = useState("all-companies");
  const [selectedForCollaboration, setSelectedForCollaboration] = useState(null);

  useEffect(() => {
    dispatch(fetchAvailableCompanies());
    dispatch(fetchSubmittedDrives());
    console.log("Fetched available companies for collaboration", availableCompanies, drives);
  }, [dispatch]);

  const handleReject = (id) => {
    setHiringRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "Rejected" } : req))
    );
    alert("Request Rejected"); // Simple toast replacement
  };

  const handleApprove = (request) => {
    dispatch(setJobForm({
      role: request.role,
      packageLPA: request.packageLPA,
      eligibilityCriteria: {
        minCGPA: request.eligibilityCriteria.minCGPA,
        maxBacklogs: request.eligibilityCriteria.maxBacklogs,
        allowedBranches: request.eligibilityCriteria.allowedBranches.join(", "),
      },
      driveDate: request.driveDate,
      driveMode: request.jobDescription,
      jobType: request.jobType,
    }));
    setSelectedRequest(request);
    setApproveModalOpen(true);
  };

  const onApproveSuccess = () => {
    setHiringRequests((prev) =>
      prev.map((req) =>
        req.id === selectedRequest?.id ? { ...req, status: "Approved" } : req
      )
    );
  };

  const handleCollaborationRequest = (company) => {
    setSelectedForCollaboration({ ...company, viaButton: true }); // mark
    setActiveTab("collaboration-requests");
  };

  // Clear selection if user manually clicks the tab
  const handleTabChange = (value) => {
    setActiveTab(value);
    if (value === "collaboration-requests" && !selectedForCollaboration?.viaButton) {
      // clear previous selection if not coming from All Companies
      setSelectedForCollaboration(null);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader title="Companies" description="Manage company collaborations and invitations." />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all-companies">All Companies</TabsTrigger>
            <TabsTrigger value="collaboration-requests">Collaboration Requests</TabsTrigger>
            <TabsTrigger value="hiring-requests">Hiring Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="all-companies" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {availableCompanies && availableCompanies.length > 0 && availableCompanies.map(company => {
                // const logo = PlaceHolderImages.find(p => p.id === company.logo);
                // const companyJobs = jobs.filter(j => j.companyId === company.id);
                return (
                  <Card key={company._id} className="flex flex-col">
                    <CardHeader className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 flex items-center justify-center overflow-hidden rounded-full bg-muted">
                        <img
                          src={company.logoUrl}
                          alt={`${company.companyName} logo`}
                          width={90}
                          height={90}
                          className="w-full h-full object-cover"
                          data-ai-hint={company.companyName}
                        />
                      </div>
                      <CardTitle className="font-headline pt-4">{company.companyName}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow text-center">
                      <p className="text-sm text-muted-foreground">
                        {
                          company.additionalInformation
                            ? company.additionalInformation.length > 120
                              ? company.additionalInformation.slice(0, 120) + "..."
                              : company.additionalInformation
                            : "No information provided."
                        }
                      </p>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                      <Button asChild className="w-full" onClick={() => navigate(`/companies/${company.id}`)}>View Details</Button>
                      <Button asChild className="w-full" onClick={() => handleCollaborationRequest(company)}>Collaboration Request</Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
            {availableCompanies && availableCompanies.length === 0 && (
              <div className="py-10 w-full">
                <EmptyState
                  icon={Briefcase}
                  title="No Companies Added Yet"
                  description="You have collaborated with all registered companies. Go to the 'Send Invitations' tab to add companies and start inviting them."
                />
              </div>)}
          </TabsContent>
          <TabsContent value="collaboration-requests" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Collaboration Requests</CardTitle>
                <CardDescription>Create and send personalized or bulk invitations to companies for campus placement drives.</CardDescription>
              </CardHeader>
              <CardContent>
                <InvitationPreviewDialog availableCompanies={availableCompanies} user={user} selectedCompany={selectedForCollaboration} setSelectedCompany={setSelectedForCollaboration} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="hiring-requests" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {drives && drives?.map(request => {
                return (
                  <Card key={request._id}>
                    <CardHeader className="flex flex-row items-start gap-4">
                      <img src={request.companyId.logoUrl} alt={request.companyId.companyName} width={48} height={48} className="rounded-lg" data-ai-hint={request.companyId.companyName} />
                      <div>
                        <CardTitle className="font-headline text-xl">{request.companyId.companyName}</CardTitle>
                        <CardDescription>{request.campusName}</CardDescription>
                      </div>
                      <Badge variant={
                        request.status === 'SUBMITTED' ? 'default' :
                          request.status === 'REJECTED' ? 'destructive' : 'secondary'
                      } className="ml-auto">{request.status}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-sm flex items-center gap-2"><Briefcase /> {request.role}</h4>
                        <p className="font-semibold text-sm flex items-center gap-2"><CircleDollarSign /> {request.packageLPA} LPA</p>
                      </div>
                      <p className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-md border">
                        {
                          request.jobDescription
                            ? request.jobDescription.length > 130
                              ? request.jobDescription.slice(0, 210) + "..."
                              : request.jobDescription
                            : "No information provided."
                        }
                      </p>
                    </CardContent>
                    {request.status === 'SUBMITTED' && (
                      <CardFooter className="gap-2">
                        <Button variant="outline" className="w-full" onClick={() => handleReject(request.id)}>
                          <XCircle className="mr-2" /> Reject
                        </Button>
                        <Button className="w-full" onClick={() => handleApprove(request)}>
                          <CheckCircle className="mr-2" /> Approve
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                )
              })}
            </div>
            {drives.length === 0 && (
              <div className="py-10 w-full">
                <EmptyState
                  className="w-full"
                  icon={Inbox}
                  title="No Hiring Requests Yet"
                  description="There are currently no hiring requests from companies. Once a company sends a request, it will appear here."
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      {selectedRequest && <ApproveRequestDialog open={approveModalOpen} onOpenChange={setApproveModalOpen} request={selectedRequest} onSuccess={onApproveSuccess} />}
    </div>
  );
}

// ------------------- Invitation Dialog -------------------
function InvitationPreviewDialog({ availableCompanies, user, selectedCompany, setSelectedCompany }) {
  // const [selectedCompany, setSelectedCompany] = useState(null);
  const [emailBody, setEmailBody] = useState("");
  const [file, setFile] = useState(null);

  const [manualCompany, setManualCompany] = useState({
    companyName: "",
    contactPersonName: "",
    contactEmail: "",
  });

  const defaultEmailSubject = "Campus Placement Collaboration Invite";
  useEffect(() => {
    const body = `Dear ${selectedCompany?.contactPersonName || manualCompany?.contactPersonName || "{{HR_NAME}}"},

We would like to invite ${selectedCompany?.companyName || manualCompany?.companyName || "{{COMPANY_NAME}}"} to participate in our upcoming campus placement drive.

Our institution believes ${selectedCompany?.companyName || manualCompany?.companyName || "{{COMPANY_NAME}}"} would be a valuable opportunity for our students.

Please let us know your interest.

Best regards,
Training & Placement Office
${user?.organization.collegeName || "{{COLLEGE_NAME}}"}
${user?.email || "{{TPO_EMAIL}}"}`

    console.log("Generated email body:", manualCompany);
    setEmailBody(body);
  }, [selectedCompany, manualCompany]);


  const handleSend = async () => {
    // Validation: at least one selected or manual company
    if (
      (!selectedCompany || Object.keys(selectedCompany).length === 0) &&
      (!manualCompany.companyName || !manualCompany.contactEmail)
    ) {
      alert("Please select a registered company or enter a manual company with name and email");
      return;
    }

    try {
      let payload = {
        mode: "", // REGISTERED | MANUAL | BULK
        companyIds: [],
        manualCompanies: [],
        message: emailBody || ""
      };

      if (selectedCompany && Object.keys(selectedCompany).length > 0) {
        // Registered company
        payload.mode = "REGISTERED";
        payload.companyIds = [selectedCompany._id];
      } else if (manualCompany && manualCompany.companyName && manualCompany.contactEmail) {
        // Manual single company
        payload.mode = "MANUAL";
        payload.manualCompanies = [
          {
            companyName: manualCompany.companyName,
            contactPersonName: manualCompany.contactPersonName || "",
            contactEmail: manualCompany.contactEmail
          }
        ];
      }
      // For BULK, you would set payload.mode = "BULK" and fill manualCompanies with the array from uploaded Excel.

      await axiosInstance.post("/tpo/collaborations/send", payload);

      alert("Invitation sent successfully");
      setManualCompany({
        companyName: "",
        contactPersonName: "",
        contactEmail: ""
      });
      setSelectedCompany(null);
    } catch (error) {
      alert("Error sending invitation: " + error.message);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const allowedExtensions = [".pdf", ".doc", ".odt", ".docx"];
      const ext = selectedFile.name.slice(selectedFile.name.lastIndexOf("."));
      if (allowedExtensions.includes(ext.toLowerCase())) {
        setFile(selectedFile);
      } else {
        // toast({ variant: "destructive", title: "Invalid File Type", description: "Use .xlsx, .xls, or .csv file" });
        e.target.value = "";
      }
    }
  };

  const uploadedCompanies = [
    { companyName: "Innovatech Solutions", hrName: "Jane Doe", hrEmail: "jane.d@innovatech.com" },
    { companyName: "Quantum Dynamics", hrName: "John Smith", hrEmail: "j.smith@quantum.com" },
  ];

  return (
    <div className="grid flex-1 grid-cols-1 gap-8 overflow-y-auto md:grid-cols-2">
      <div className="space-y-6 pr-4">
        <Tabs defaultValue="individual">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="individual">Individual Company</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Mode</TabsTrigger>
          </TabsList>

          {/* Individual */}
          <TabsContent value="individual" className="mt-4 space-y-4">
            {availableCompanies && availableCompanies?.length !== 0 && (
              <>
                <div className="space-y-2">
                  <Label>Select a registered company</Label>
                  <Select
                    value={selectedCompany?._id || ""}
                    onValueChange={(value) => {
                      const company = availableCompanies.find(c => c._id === value);
                      setSelectedCompany(company);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Search and select a company..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCompanies?.map((c) => (
                        <SelectItem key={c._id} value={c._id}>
                          {c.companyName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                </div>
                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-background px-2 text-xs text-muted-foreground">OR</span>
                </div>
              </>)}
            <p className="text-sm font-medium">Manually enter company details</p>
            <div className="space-y-4 rounded-md border p-4">
              <div className="space-y-2">
                <Label htmlFor="manual-company-name">Company Name</Label>
                <Input
                  placeholder="e.g. Acme Corp"
                  value={manualCompany.companyName}
                  onChange={(e) =>
                    setManualCompany({ ...manualCompany, companyName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manual-hr-name">HR Name</Label>
                <Input
                  placeholder="e.g. Alex Ray"
                  value={manualCompany.contactPersonName}
                  onChange={(e) =>
                    setManualCompany({ ...manualCompany, contactPersonName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manual-hr-email">HR Email</Label>
                <Input
                  type="email"
                  placeholder="e.g. alex@acme.com"
                  value={manualCompany.contactEmail}
                  onChange={(e) =>
                    setManualCompany({ ...manualCompany, contactEmail: e.target.value })
                  }
                />
              </div>
            </div>
          </TabsContent>

          {/* Bulk */}
          <TabsContent value="bulk" className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label>Select multiple companies</Label>
              <Input placeholder="Search and select companies" disabled />
              <p className="text-xs text-muted-foreground">Multi-select component to be added here.</p>
            </div>
            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-background px-2 text-xs text-muted-foreground">OR</span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bulk-upload">Upload an Excel file (XLSX, CSV)</Label>
              <Label htmlFor="bulk-upload" className="flex h-24 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border text-center">
                <div className="space-y-1">
                  <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag & drop</p>
                </div>
                <Input id="bulk-upload" type="file" className="hidden" />
              </Label>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Uploaded Companies</p>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company Name</TableHead>
                      <TableHead>HR Name</TableHead>
                      <TableHead>HR Email</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uploadedCompanies.map((c) => (
                      <TableRow key={c.hrEmail}>
                        <TableCell>{c.companyName}</TableCell>
                        <TableCell>{c.hrName}</TableCell>
                        <TableCell>{c.hrEmail}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Email Template */}
      <div className="space-y-6">
        <h3 className="text-lg">Email Template</h3>
        <div className="space-y-4 rounded-md border bg-muted/30 p-4">
          <div className="space-y-2">
            <Label htmlFor="email-subject">Subject</Label>
            <Input id="email-subject" defaultValue={defaultEmailSubject} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-body">Body</Label>
            <Textarea id="email-body" value={emailBody} onChange={(e) => setEmailBody(e.target.value)} rows={12} />
            <p className="text-xs text-muted-foreground">
              Placeholders like {'{{HR_NAME}}'} will be replaced for each recipient.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-attachments">Attachments</Label>
            <div className="flex items-center gap-2">
              {file ? (
                <div className="flex justify-between items-center border rounded p-3 w-full">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span>{file.name}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Label htmlFor="attachment-upload" className="cursor-pointer flex items-center gap-2">
                      <FileUp className="mr-2 h-4 w-4" /> Add File
                    </Label>
                  </Button>
                  <Input id="attachment-upload"
                    type="file"
                    className="hidden"
                    accept=".docs,.doc,.odt,.pdf"
                    onChange={handleFileChange}
                  />
                </>
              )}
            </div>
            {/* <div className="flex items-center gap-2 rounded-md border p-2">
              <p className="text-sm font-medium">Placement_Brochure.pdf</p>
              <Button variant="ghost" size="icon" className="ml-auto h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </div> */}
          </div>
          <Button onClick={handleSend}>
            <Send className="mr-2 h-4 w-4" />
            Send Invitation
          </Button>
        </div>
      </div>
    </div>
  );
}

// ------------------- Approve Hiring Request Dialog -------------------
function ApproveRequestDialog({ open, onOpenChange, request, onSuccess }) {
  const [step, setStep] = useState("form");
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess();
    setStep("success");
    alert("Request Approved");
  };

  if (step === "success") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader className="text-center items-center">
            <div className="p-3 bg-green-100 rounded-full w-fit">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <DialogTitle>Hiring Request Approved!</DialogTitle>
            <DialogDescription>
              You have approved the request from {request.companyName}.
              The next step is to create a job posting to make it visible to students.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button onClick={() => {navigate('/tpo/jobs/')}}>
              <PlusCircle className="mr-2" /> Create Job Posting
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Approve Hiring Request & Create Drive</DialogTitle>
          <DialogDescription>Review the details for the campus drive requested by {request.companyName}.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto px-6 py-4 space-y-6">
          {/* Form fields here, unchanged */}
          <DialogFooter className="sticky bottom-0 bg-background py-4 -mx-6 px-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">
              <CheckCircle className="mr-2" /> Approve Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ------------------- Dummy initialHiringRequests -------------------
const initialHiringRequests = [
  {
    id: "hr-001",
    companyName: "Innovatech Solutions",
    jobRole: "Senior AI Engineer",
    ctc: "25 LPA",
    campusName: "Main Campus",
    status: "Pending",
    message: "Looking for top AI talent for our new R&D division.",
    companyId: "innovatech-solutions",
    logo: "innovatech-solutions-logo"
  },
  {
    id: "hr-002",
    companyName: "Quantum Dynamics",
    jobRole: "Quantum Computing Intern",
    ctc: "12 LPA",
    campusName: "Main Campus",
    status: "Pending",
    message: "We are seeking bright minds for a 6-month internship program.",
    companyId: "quantum-dynamics",
    logo: "quantum-dynamics-logo"
  }
];

export default TPOCompaniesPage;