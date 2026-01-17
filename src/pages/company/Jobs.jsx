import { AppHeader } from "../../components/app-header/AppHeader";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";

export default function CompanyJobsPage() {
  const activeJobs = [
    {
      id: 1,
      role: "SDE I",
      college: "XYZ Institute of Technology",
      status: "Active",
    },
    {
      id: 2,
      role: "Data Analyst",
      college: "ABC College of Engineering",
      status: "Active",
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader
        title="Job Postings"
        description="Create and manage your job postings for campus drives."
      />

      <main className="flex flex-1 flex-col gap-6 p-4 md:p-8">
        {/* CREATE JOB */}
        <Card>
          <CardHeader>
            <CardTitle>Create Job Posting</CardTitle>
            <CardDescription>
              Fill details to create a new job opening
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Role</Label>
                <Input placeholder="Software Development Engineer" />
              </div>

              <div className="space-y-2">
                <Label>Package (LPA)</Label>
                <Input placeholder="15" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Eligibility</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input placeholder="Min CGPA" />
                <Input placeholder="Max Backlogs" />
                <Input placeholder="Branches (comma separated)" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Job Description</Label>
              <Textarea
                rows={6}
                placeholder="Enter job responsibilities and requirements"
              />
            </div>

            <Button>Create Job</Button>
          </CardContent>
        </Card>

        {/* ACTIVE JOBS */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeJobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <CardTitle>{job.role}</CardTitle>
                <CardDescription>{job.college}</CardDescription>
              </CardHeader>

              <CardContent className="flex items-center justify-between">
                <Badge>Status: {job.status}</Badge>
                <Button variant="outline">Update</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

