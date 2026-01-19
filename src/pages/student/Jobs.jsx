import React from "react";

import { jobs, companies, applications } from "../../lib/data";
import { PlaceHolderImages } from "../../lib/placeholder-images";
import { cn } from "../../lib/utils";

import { AppHeader } from "../../components/app-header/AppHeader";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

import { CheckCircle, ExternalLink, XCircle } from "lucide-react";

export default function Jobs() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader
        title="Jobs"
        description="Explore on-campus, external, and applied job opportunities."
      />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Tabs defaultValue="on-campus">

          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="on-campus">On-Campus Jobs</TabsTrigger>
            <TabsTrigger value="external">External Opportunities</TabsTrigger>
            <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
          </TabsList>

          {/* ---------------- ON CAMPUS ---------------- */}
          <TabsContent value="on-campus">
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3 mt-6">
              {jobs.map((job, index) => {
                const company = companies.find(c => c.id === job.companyId);
                const companyLogo = PlaceHolderImages.find(
                  p => p.id === company?.logo
                );

                const isEligible = index % 2 === 0;

                return (
                  <Card key={job.id} className="flex flex-col">
                    <CardHeader className="flex-row items-start gap-4">
                      {companyLogo && (
                        <img
                          src={companyLogo.imageUrl}
                          alt={`${company?.name} logo`}
                          width={64}
                          height={64}
                          className="rounded-lg"
                        />
                      )}

                      <div>
                        <CardTitle className="text-xl">
                          {job.title}
                        </CardTitle>
                        <CardDescription>
                          {company?.name} · {job.location}
                        </CardDescription>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-grow">
                      <Badge
                        variant={isEligible ? "default" : "destructive"}
                        className="mb-4"
                      >
                        {isEligible ? (
                          <CheckCircle className="mr-2 h-4 w-4" />
                        ) : (
                          <XCircle className="mr-2 h-4 w-4" />
                        )}
                        {isEligible ? "You are eligible" : "Not eligible"}
                      </Badge>

                      {!isEligible && (
                        <p className="text-xs text-muted-foreground mb-4">
                          Reason: CGPA below requirement
                        </p>
                      )}

                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {job.description}
                      </p>
                    </CardContent>

                    <CardFooter>
                      <Button className="w-full">View Details</Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* ---------------- EXTERNAL ---------------- */}
          <TabsContent value="external">
            <Card>
              <CardHeader>
                <CardTitle>External Job Opportunities</CardTitle>
                <CardDescription>
                  Off-campus hiring links
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Link</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    <TableRow>
                      <TableCell>Frontend Developer</TableCell>
                      <TableCell>WebCo</TableCell>
                      <TableCell>
                        <Button variant="outline">
                          Apply <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Backend Engineer</TableCell>
                      <TableCell>DataCorp</TableCell>
                      <TableCell>
                        <Button variant="outline">
                          Apply <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ---------------- APPLIED ---------------- */}
          <TabsContent value="applied">
            <Card>
              <CardHeader>
                <CardTitle>Your Applications</CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {applications.map(app => {
                      const job = jobs.find(j => j.id === app.jobId);
                      const company = companies.find(
                        c => c.id === job?.companyId
                      );

                      return (
                        <TableRow key={app.id}>
                          <TableCell className="font-medium">
                            {job?.title}
                          </TableCell>
                          <TableCell>{company?.name}</TableCell>
                          <TableCell>
                            {new Date(app.dateApplied).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={cn({
                                "bg-blue-100 text-blue-800": app.status === "Applied",
                                "bg-yellow-100 text-yellow-800": app.status === "Interviewing",
                                "bg-green-100 text-green-800": app.status === "Offer",
                                "bg-red-100 text-red-800": app.status === "Rejected",
                              })}
                            >
                              {app.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}
