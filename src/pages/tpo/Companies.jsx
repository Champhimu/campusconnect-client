import React, { useState } from "react";

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
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";

import { AppHeader } from "../../components/app-header/AppHeader";

import { companies, jobs } from "../../lib/data.js";
import { PlaceHolderImages } from "../../lib/placeholder-images.js";

import {
  PlusCircle,
  Send,
  FileUp,
  X,
  CheckCircle,
  XCircle,
  Briefcase,
  CircleDollarSign,
  Upload
} from "lucide-react";

// Dummy placeholder images and data


function TPOCompaniesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hiringRequests, setHiringRequests] = useState(initialHiringRequests);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleReject = (id) => {
    setHiringRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "Rejected" } : req))
    );
    alert("Request Rejected"); // Simple toast replacement
  };

  const handleApprove = (request) => {
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

  return (
    <div className="flex min-h-screen w-full flex-col">
      <h1 className="text-2xl font-bold p-4">Companies</h1>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Tabs defaultValue="collaboration-requests">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all-companies">All Companies</TabsTrigger>
            <TabsTrigger value="collaboration-requests">
              Collaboration Requests
            </TabsTrigger>
            <TabsTrigger value="hiring-requests">Hiring Requests</TabsTrigger>
          </TabsList>

          {/* All Companies */}
          <TabsContent value="all-companies" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {companies.map((company) => {
                const logo = PlaceHolderImages.find((p) => p.id === company.logo);
                const companyJobs = jobs.filter((j) => j.companyId === company.id);
                return (
                  <Card key={company.id} className="flex flex-col">
                    <CardHeader className="items-center text-center">
                      {logo && (
                        <img
                          src={logo.imageUrl}
                          alt={`${company.name} logo`}
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                      )}
                      <CardTitle className="pt-4">{company.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow text-center">
                      <p className="text-sm text-muted-foreground">
                        Offering roles like: {companyJobs.map((j) => j.title).join(", ")}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Collaboration Requests */}
          <TabsContent value="collaboration-requests" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Collaboration Requests</CardTitle>
                <CardDescription>
                  Create and send personalized or bulk invitations to companies for campus placement drives.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setIsModalOpen(true)}>
                  <Send className="mr-2 h-4 w-4" />
                  Create & Send Invitations
                </Button>
              </CardContent>
            </Card>
            <InvitationPreviewDialog open={isModalOpen} onOpenChange={setIsModalOpen} />
          </TabsContent>

          {/* Hiring Requests */}
          <TabsContent value="hiring-requests" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {hiringRequests.map((request) => {
                const logo = PlaceHolderImages.find((p) => p.id === request.logo);
                return (
                  <Card key={request.id}>
                    <CardHeader className="flex-row items-start gap-4">
                      {logo && <img src={logo.imageUrl} alt={request.companyName} width={48} height={48} className="rounded-lg" />}
                      <div>
                        <CardTitle className="text-xl">{request.companyName}</CardTitle>
                        <CardDescription>{request.campusName}</CardDescription>
                      </div>
                      <Badge className="ml-auto">{request.status}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-1">
                        <h4 className="flex items-center gap-2"><Briefcase /> {request.jobRole}</h4>
                        <p className="flex items-center gap-2"><CircleDollarSign /> {request.ctc}</p>
                      </div>
                      <p className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-md border">{request.message}</p>
                    </CardContent>
                    {request.status === "Pending" && (
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
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      {selectedRequest && (
        <ApproveRequestDialog
          open={approveModalOpen}
          onOpenChange={setApproveModalOpen}
          request={selectedRequest}
          onSuccess={onApproveSuccess}
        />
      )}
    </div>
  );
}

// ------------------- Invitation Dialog -------------------
function InvitationPreviewDialog({ open, onOpenChange }) {
  const defaultEmailSubject = "Campus Placement Collaboration Invite";
  const defaultEmailBody = `Dear {{HR_NAME}},

We would like to invite {{COMPANY_NAME}} to participate in our upcoming campus placement drive.

Our institution believes {{COMPANY_NAME}} would be a valuable opportunity for our students.

Please let us know your interest.

Best regards,
Training & Placement Office
{{COLLEGE_NAME}}
{{TPO_EMAIL}}`;

  const handleSend = () => {
    alert("Invitations Sent"); // Simple toast replacement
    onOpenChange(false);
  };

  const uploadedCompanies = [
    { companyName: "Innovatech Solutions", hrName: "Jane Doe", hrEmail: "jane.d@innovatech.com" },
    { companyName: "Quantum Dynamics", hrName: "John Smith", hrEmail: "j.smith@quantum.com" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Email Invitation Preview</DialogTitle>
        </DialogHeader>
        <div className="grid flex-1 grid-cols-1 gap-8 overflow-y-auto p-6 md:grid-cols-2">
          <div className="space-y-6 pr-4">
            <Tabs defaultValue="individual">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="individual">Individual Company</TabsTrigger>
                <TabsTrigger value="bulk">Bulk Mode</TabsTrigger>
              </TabsList>

              {/* Individual */}
              <TabsContent value="individual" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label>Select a registered company</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Search and select a company..." />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-background px-2 text-xs text-muted-foreground">OR</span>
                </div>
                <p className="text-sm font-medium">Manually enter company details</p>
                <div className="space-y-4 rounded-md border p-4">
                  <div className="space-y-2">
                    <Label htmlFor="manual-company-name">Company Name</Label>
                    <Input id="manual-company-name" placeholder="e.g. Acme Corp" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manual-hr-name">HR Name</Label>
                    <Input id="manual-hr-name" placeholder="e.g. Alex Ray" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manual-hr-email">HR Email</Label>
                    <Input id="manual-hr-email" type="email" placeholder="e.g. alex@acme.com" />
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
                <Textarea id="email-body" defaultValue={defaultEmailBody} rows={12} />
                <p className="text-xs text-muted-foreground">
                  Placeholders like {'{{HR_NAME}}'} will be replaced for each recipient.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-attachments">Attachments</Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Label htmlFor="attachment-upload" className="cursor-pointer">
                      <FileUp className="mr-2 h-4 w-4" /> Add File
                    </Label>
                  </Button>
                  <Input id="attachment-upload" type="file" className="hidden" />
                </div>
                <div className="flex items-center gap-2 rounded-md border p-2">
                  <p className="text-sm font-medium">Placement_Brochure.pdf</p>
                  <Button variant="ghost" size="icon" className="ml-auto h-6 w-6">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSend}>
            <Send className="mr-2 h-4 w-4" />
            Send Invitation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ------------------- Approve Hiring Request Dialog -------------------
function ApproveRequestDialog({ open, onOpenChange, request, onSuccess }) {
  const [step, setStep] = useState("form");

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
            <Button>
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
              <CheckCircle className="mr-2"/> Approve Request
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
