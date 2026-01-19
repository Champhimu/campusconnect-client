import { AppHeader } from "../../components/app-header/AppHeader";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Send } from "lucide-react";
import { Link } from "react-router-dom";

//import { companies, jobs } from "../../lib/data";
import { companies, jobs, applications } from "../../lib/data";

import { PlaceHolderImages } from "../../lib/placeholder-images";

export default function TPOCompaniesPage() {
  const collaborations = [
    {
      company: "DataCorp",
      hrName: "Emily White",
      hrEmail: "emily.w@datacorp.co",
      tpoEmail: "tpo@college.edu",
      status: "Sent",
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader
        title="Companies"
        description="Manage company collaborations and invitations."
      />

      <main className="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <Tabs defaultValue="all-companies">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all-companies">All Companies</TabsTrigger>
            <TabsTrigger value="collaboration-requests">
              Collaboration Requests
            </TabsTrigger>
          </TabsList>

          {/* ALL COMPANIES */}
          <TabsContent value="all-companies" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {companies.map((company) => {
                const logo = PlaceHolderImages.find(
                  (p) => p.id === company.logo
                );
                const companyJobs = jobs.filter(
                  (j) => j.companyId === company.id
                );

                return (
                  <Card key={company.id} className="flex flex-col">
                    <CardHeader className="items-center text-center">
                      {logo && (
                        <img
                          src={logo.imageUrl}
                          alt={`${company.name} logo`}
                          className="h-20 w-20 rounded-full object-cover"
                        />
                      )}
                      <CardTitle className="pt-4">
                        {company.name}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-grow text-center">
                      <p className="text-sm text-muted-foreground">
                        Offering roles:{" "}
                        {companyJobs.map((j) => j.title).join(", ")}
                      </p>
                    </CardContent>

                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link to={`/dashboard/tpo/companies/${company.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* COLLABORATIONS */}
          <TabsContent value="collaboration-requests" className="mt-6">
            <div className="grid gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Add Company Collaboration</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company Name</Label>
                      <Input placeholder="e.g. Innovatech" />
                    </div>
                    <div className="space-y-2">
                      <Label>HR Name</Label>
                      <Input placeholder="e.g. John Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>HR Email</Label>
                    <Input type="email" placeholder="hr@company.com" />
                  </div>

                  <div className="space-y-2">
                    <Label>Your Email (TPO)</Label>
                    <Input type="email" placeholder="tpo@college.edu" />
                  </div>

                  <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Send Invitation
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sent Invitations</CardTitle>
                </CardHeader>

                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>HR Email</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {collaborations.map((c, i) => (
                        <TableRow key={i}>
                          <TableCell>{c.company}</TableCell>
                          <TableCell>{c.hrEmail}</TableCell>
                          <TableCell>{c.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
