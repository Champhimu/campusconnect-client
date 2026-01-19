import React from "react";
import { CheckCircle, Circle, Loader } from "lucide-react";

import { AppHeader } from "../../components/app-header/AppHeader";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const ApplicationStatusPage = () => {
  const rounds = [
    { name: "Online Assessment", status: "completed" },
    { name: "Technical Round 1", status: "completed" },
    { name: "Technical Round 2", status: "active" },
    { name: "HR Round", status: "pending" },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "active":
        return <Loader className="h-6 w-6 text-blue-500 animate-spin" />;
      case "pending":
      default:
        return <Circle className="h-6 w-6 text-muted-foreground" />;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader title="Application Status" />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {/* Select Application */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">
              Select Application
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Select>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a job application" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="job-1">
                  Software Engineer - Innovatech
                </SelectItem>
                <SelectItem value="job-2">
                  Data Scientist - Quantum Dynamics
                </SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Progress Card */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">
              Round-wise Progress
            </CardTitle>
            <CardDescription>
              Track your progress through interview stages
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="relative space-y-8">
              <div className="absolute left-3 top-0 h-full w-0.5 bg-border" />

              {rounds.map((round, index) => (
                <div key={index} className="flex items-center gap-6 relative">
                  <div className="z-10 bg-background p-1 rounded-full border-2 border-border">
                    {getStatusIcon(round.status)}
                  </div>

                  <div className="flex-grow">
                    <p className="font-semibold">{round.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {round.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ApplicationStatusPage;
