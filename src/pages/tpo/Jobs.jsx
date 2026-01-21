import { AppHeader } from "../../components/app-header/AppHeader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
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
  RadioGroup,
  RadioGroupItem,
} from "../../components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Textarea } from "../../components/ui/textarea";
import { jobs } from "../../lib/data";

export default function TpoJobsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader
        title="Jobs & Drives"
        description="Create, manage, and schedule placement drives."
      />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Tabs defaultValue="create-job">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="create-job">Create Job</TabsTrigger>
            <TabsTrigger value="active-jobs">Active Jobs</TabsTrigger>
            <TabsTrigger value="drive-schedule">Drive Schedule</TabsTrigger>
          </TabsList>

          {/* CREATE JOB */}
          <TabsContent value="create-job" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Campus Drive</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Role</Label>
                    <Input placeholder="e.g. Software Engineer" />
                  </div>
                  <div>
                    <Label>Package (LPA)</Label>
                    <Input placeholder="e.g. 12" />
                  </div>
                </div>

                <div>
                  <Label>Eligibility Criteria</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Input placeholder="Min. CGPA" />
                    <Input placeholder="Max Backlogs" />
                    <Input placeholder="Allowed Branches" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Drive Date</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label>Drive Mode</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Job Description</Label>
                  <Textarea placeholder="Paste job description..." />
                </div>

                <div>
                  <Label>Job Type</Label>
                  <RadioGroup defaultValue="fulltime" className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="fulltime" />
                      <Label>Full-time</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="internship" />
                      <Label>Internship</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="ppo" />
                      <Label>PPO</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button>Create Job</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ACTIVE JOBS */}
          <TabsContent value="active-jobs" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.slice(0, 3).map((job) => (
                <Card key={job.id}>
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>
                      {job.companyId.replace(/-/g, " ")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Applied</span>
                      <span>120</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Eligible</span>
                      <span>450</span>
                    </div>
                    <Badge>Ongoing</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* DRIVE SCHEDULE */}
          <TabsContent value="drive-schedule" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Campus Drive Calendar</CardTitle>
                <CardDescription>
                  Timeline of all scheduled placement drives
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="multiple"
                  selected={[new Date(2024, 9, 28), new Date(2024, 10, 5)]}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}


