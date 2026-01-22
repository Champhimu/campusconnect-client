import { AppHeader } from "../../components/app-header/AppHeader";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { PlusCircle, Send, MoreHorizontal, FileText, CheckCircle, XCircle, Paperclip, Upload, Inbox } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { Separator } from "../../components/ui/separator";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { useToast } from "../../hooks/use-toast";
import { EmptyState } from "../../components/empty-state";

const initialIncomingInvites = [
  {
    id: 1,
    college: "Global Tech University",
    tpoName: "Dr. Alan Grant",
    tpoEmail: "alan.g@gtu.edu",
    date: "2024-10-15",
    status: "Pending"
  },
  {
    id: 2,
    college: "National College of Science",
    tpoName: "Dr. Ellie Sattler",
    tpoEmail: "ellie.s@ncs.edu",
    date: "2024-10-12",
    status: "Accepted"
  },
  {
    id: 3,
    college: "Regional Engineering College",
    tpoName: "Ian Malcolm",
    tpoEmail: "ian.m@rec.edu",
    date: "2024-10-10",
    status: "Rejected"
  }
];

export default function InstituteInvitesPage() {
  const [invitesToSend, setInvitesToSend] = useState([]);
  const [incomingInvites, setIncomingInvites] = useState(initialIncomingInvites);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [selectedInvite, setSelectedInvite] = useState(null);

  const handleInviteAction = (id, newStatus) => {
    setIncomingInvites(invites =>
      invites.map(invite =>
        invite.id === id ? { ...invite, status: newStatus } : invite
      )
    );
  };

  const handlePreview = invite => {
    setSelectedInvite(invite);
    setPreviewModalOpen(true);
  };

  const handleAccept = invite => {
    setSelectedInvite(invite);
    setAcceptModalOpen(true);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader
        title="Institute Invites"
        description="Invite colleges for campus drives and track invitation status."
      />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Tabs defaultValue="invitation-status">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="send-invites">Send Invitations</TabsTrigger>
            <TabsTrigger value="invitation-status">Incoming Invites</TabsTrigger>
          </TabsList>

          {/* SEND INVITES TAB */}
          <TabsContent value="send-invites" className="mt-6">
            <div className="grid gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">College Invitation</CardTitle>
                  <CardDescription>
                    Fill in the details to invite a new college.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="college-name">College Name</Label>
                    <Input id="college-name" placeholder="e.g. Global Tech University" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tpo-name">TPO Name</Label>
                      <Input id="tpo-name" placeholder="e.g. Dr. Alan Grant" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tpo-email">TPO Email</Label>
                      <Input id="tpo-email" type="email" placeholder="e.g. tpo@college.edu" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hr-email">Your Email (HR)</Label>
                    <Input id="hr-email" type="email" placeholder="e.g. hr@company.com" />
                  </div>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add to List
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row justify-between">
                  <CardTitle className="font-headline">Invitation List</CardTitle>
                  <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Send All
                  </Button>
                </CardHeader>
                <CardContent>
                  {invitesToSend.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>College</TableHead>
                          <TableHead>TPO Name</TableHead>
                          <TableHead>TPO Email</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invitesToSend.map((invite, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">{invite.college}</TableCell>
                            <TableCell>{invite.tpo}</TableCell>
                            <TableCell>{invite.tpoEmail}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="py-10">
                      <EmptyState
                        icon={Send}
                        title="Invitation List is Empty"
                        description="Add colleges to the list using the form on the left."
                      />
                    </div>
                  )}
                  <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                    <h4 className="font-semibold text-sm mb-2">Email Template Preview</h4>
                    <p className="text-xs text-muted-foreground">Subject: Invitation for Campus Recruitment Drive - [Your Company Name]</p>
                    <p className="text-xs text-muted-foreground mt-2">Dear [TPO Name], We would like to invite [College Name] to participate...</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* INCOMING INVITES TAB */}
          <TabsContent value="invitation-status" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Incoming Campus Invites</CardTitle>
                <CardDescription>Review and respond to campus drive invitations from colleges.</CardDescription>
              </CardHeader>
              <CardContent>
                {incomingInvites.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>College Name</TableHead>
                        <TableHead>TPO Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {incomingInvites.map(invite => (
                        <TableRow key={invite.id}>
                          <TableCell className="font-medium">{invite.college}</TableCell>
                          <TableCell>{invite.tpoName}</TableCell>
                          <TableCell>{invite.date}</TableCell>
                          <TableCell>
                            <Badge variant={
                              invite.status === 'Accepted' ? 'default' :
                                invite.status === 'Rejected' ? 'destructive' : 'secondary'
                            }>{invite.status}</Badge>
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
                                <DropdownMenuItem onSelect={() => handlePreview(invite)}>
                                  <FileText className="mr-2 h-4 w-4" /> Preview
                                </DropdownMenuItem>
                                {invite.status === 'Pending' && (
                                  <>
                                    <DropdownMenuItem onSelect={() => handleAccept(invite)}>
                                      <CheckCircle className="mr-2 h-4 w-4" /> Accept
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleInviteAction(invite.id, 'Rejected')}>
                                      <XCircle className="mr-2 h-4 w-4" /> Reject
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <EmptyState
                    icon={Inbox}
                    title="No Incoming Invites"
                    description="Campus drive invitations sent by colleges will appear here."
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <PreviewInviteDialog
        open={previewModalOpen}
        onOpenChange={setPreviewModalOpen}
        invite={selectedInvite}
      />

      <AcceptInviteDialog
        open={acceptModalOpen}
        onOpenChange={setAcceptModalOpen}
        invite={selectedInvite}
        onSuccess={() => {
          if (selectedInvite) {
            handleInviteAction(selectedInvite.id, "Accepted");
          }
        }}
      />
    </div>
  );
}

function PreviewInviteDialog({ open, onOpenChange, invite }) {
  if (!invite) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline">
            Invitation Preview
          </DialogTitle>
          <DialogDescription>
            This is the invitation email sent by {invite.tpoName} from{" "}
            {invite.college}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 p-6 pt-0">
          <div className="rounded-lg border p-4 space-y-4">
            <div>
              <p className="text-sm font-medium">
                Subject: Campus Placement Invitation
              </p>
              <p className="text-sm text-muted-foreground">
                From: {invite.tpoEmail}
              </p>
            </div>

            <Separator />

            <div className="text-sm space-y-4">
              <p>Dear HR Team,</p>
              <p>
                We are pleased to invite your esteemed organization to our
                campus for the upcoming placement season.
              </p>
              <p>
                Please find the placement brochure attached. We look forward
                to a successful collaboration.
              </p>
              <p>
                Best Regards,
                <br />
                {invite.tpoName}
                <br />
                TPO, {invite.college}
              </p>
            </div>

            <Separator />

            <div>
              <p className="text-sm font-medium mb-2">Attachments</p>
              <div className="flex items-center gap-2 text-sm border p-2 rounded-md w-fit">
                <Paperclip className="h-4 w-4" />
                <span>Placement_Brochure_2025.pdf</span>
              </div>
            </div>
          </div>
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

function AcceptInviteDialog({ open, onOpenChange, invite, onSuccess }) {
  const { toast } = useToast();

  if (!invite) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    toast({
      title: "Campus Drive Created",
      description: `Your drive for ${invite.college} has been scheduled.`
    });

    onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-headline">
            Accept Invitation & Create Drive
          </DialogTitle>
          <DialogDescription>
            Fill in the details for the campus drive at {invite.college}.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="max-h-[70vh] overflow-y-auto px-6 py-4 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Role</Label>
              <Input placeholder="e.g. Software Engineer" required />
            </div>
            <div className="space-y-2">
              <Label>Package (LPA)</Label>
              <Input placeholder="e.g. 12" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Eligibility Criteria</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Input placeholder="Min. CGPA" required />
              <Input placeholder="Max Backlogs" defaultValue="0" required />
              <Input placeholder="Allowed Branches" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Drive Date</Label>
              <Input type="date" required />
            </div>
            <div className="space-y-2">
              <Label>Drive Mode</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Job Description</Label>
            <Textarea rows={6} required />
          </div>

          <div className="space-y-2">
            <Label>Job Type</Label>
            <RadioGroup defaultValue="fulltime" className="flex gap-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="fulltime" id="fulltime" />
                <Label htmlFor="fulltime">Full-time</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="internship" id="internship" />
                <Label htmlFor="internship">Internship</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="ppo" id="ppo" />
                <Label htmlFor="ppo">PPO</Label>
              </div>
            </RadioGroup>
          </div>

          <DialogFooter className="sticky bottom-0 bg-background py-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              <Upload className="mr-2 h-4 w-4" />
              Submit & Accept
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
