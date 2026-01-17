import { AppHeader } from "../../components/app-header/AppHeader";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";

import { PlusCircle, Send } from "lucide-react";

export default function InstituteInvitesPage() {
  const invites = [
    {
      college: "Global Tech University",
      tpo: "Dr. Alan Grant",
      tpoEmail: "alan.g@gtu.edu",
      hrEmail: "jane.doe@innovatech.com",
    },
  ];

  const statuses = [
    { college: "XYZ Institute of Technology", status: "Accepted" },
    { college: "National College of Science", status: "Pending" },
    { college: "Regional Engineering College", status: "Sent" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader
        title="Institute Invites"
        description="Invite colleges for campus drives and track invitation status."
      />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Tabs defaultValue="send-invites">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="send-invites">
              Send Invitations
            </TabsTrigger>
            <TabsTrigger value="invitation-status">
              Invitation Status
            </TabsTrigger>
          </TabsList>

          <TabsContent value="send-invites" className="mt-6">
            <div className="grid gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">
                    College Invitation
                  </CardTitle>
                  <CardDescription>
                    Fill in the details to invite a new college.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="college-name">College Name</Label>
                    <Input
                      id="college-name"
                      placeholder="e.g. Global Tech University"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tpo-name">TPO Name</Label>
                      <Input
                        id="tpo-name"
                        placeholder="e.g. Dr. Alan Grant"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tpo-email">TPO Email</Label>
                      <Input
                        id="tpo-email"
                        type="email"
                        placeholder="e.g. tpo@college.edu"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hr-email">Your Email (HR)</Label>
                    <Input
                      id="hr-email"
                      type="email"
                      placeholder="e.g. hr@company.com"
                    />
                  </div>

                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add to List
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="font-headline">
                      Invitation List
                    </CardTitle>
                    <CardDescription>
                      Review and send invitations.
                    </CardDescription>
                  </div>

                  <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Send All
                  </Button>
                </CardHeader>

                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>College</TableHead>
                        <TableHead>TPO Name</TableHead>
                        <TableHead>TPO Email</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {invites.map((invite, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">
                            {invite.college}
                          </TableCell>
                          <TableCell>{invite.tpo}</TableCell>
                          <TableCell>{invite.tpoEmail}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="mt-4 rounded-lg border bg-muted/50 p-4">
                    <h4 className="mb-2 text-sm font-semibold">
                      Email Template Preview
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Subject: Invitation for Campus Recruitment Drive - [Your Company Name]
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Dear [TPO Name], We would like to invite [College Name] to participate...
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="invitation-status" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {statuses.map((s) => (
                <Card key={s.college}>
                  <CardHeader>
                    <CardTitle className="font-headline text-lg">
                      {s.college}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <Badge
                      variant={
                        s.status === "Accepted"
                          ? "default"
                          : s.status === "Pending"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {s.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
