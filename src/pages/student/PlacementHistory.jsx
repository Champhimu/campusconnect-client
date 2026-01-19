import React from "react";

import { AppHeader } from "../../components/app-header/AppHeader";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

import { companies, jobs } from "../../lib/data";

const PlacementHistoryPage = () => {
  const pastPlacements = [
    {
      jobId: "job-001",
      status: "Offer Accepted",
      companyId: "innovatech-solutions",
    },
    {
      jobId: "job-003",
      status: "Rejected in Round 2",
      companyId: "nexgen-robotics",
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader title="Placement History" />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {/* Past Placements */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">
              Your Past Placements
            </CardTitle>
            <CardDescription>
              A record of your participation and offers from past campus drives.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {pastPlacements.map((p) => {
                  const job = jobs.find((j) => j.id === p.jobId);
                  const company = companies.find(
                    (c) => c.id === p.companyId
                  );

                  return (
                    <TableRow key={p.jobId}>
                      <TableCell className="font-medium">
                        {company?.name}
                      </TableCell>
                      <TableCell>{job?.title}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            p.status.includes("Accepted")
                              ? "default"
                              : "secondary"
                          }
                        >
                          {p.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {p.status === "Offer Accepted" ? (
                          <Button size="sm" variant="outline">
                            View Offer
                          </Button>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Past Campus Drives */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">
              Past Campus Drives
            </CardTitle>
            <CardDescription>
              Companies that have visited in the past.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Roles Offered</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {companies.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>
                      {jobs
                        .filter((j) => j.companyId === c.id)
                        .map((j) => j.title)
                        .join(", ")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PlacementHistoryPage;
