import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {AppHeader} from "../../components/app-header/AppHeader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
// import { RecommendedJobs } from "./components/RecommendedJobs";



import { Briefcase, CheckCircle, Clock, XCircle } from "lucide-react";

// TEMP dummy data (same logic as ZIP)
const companies = [
  { id: 1, name: "Innovatech Solutions", logo: "https://via.placeholder.com/40" },
  { id: 2, name: "Quantum Dynamics", logo: "https://via.placeholder.com/40" },
  { id: 3, name: "NexGen Robotics", logo: "https://via.placeholder.com/40" },
  { id: 4, name: "TechNova", logo: "https://via.placeholder.com/40" },
  { id: 5, name: "CyberSoft", logo: "https://via.placeholder.com/40" },
];

export default function StudentDashboard() {
  const nextCompanies = companies.slice(0, 5);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader title="Dashboard" />

      <main className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
        {/* ELIGIBILITY STATUS */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Eligibility Status</h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {nextCompanies.map((company, index) => {
              const isEligible = index % 2 === 0;

              return (
                <Card key={company.id}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-10 w-10 rounded-lg"
                    />
                    <CardTitle className="text-lg">
                      {company.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <Badge
                      variant={isEligible ? "default" : "destructive"}
                      className="w-full justify-center"
                    >
                      {isEligible ? (
                        <CheckCircle className="mr-2 h-4 w-4" />
                      ) : (
                        <XCircle className="mr-2 h-4 w-4" />
                      )}
                      {isEligible ? "Eligible" : "Not Eligible"}
                    </Badge>

                    {!isEligible && (
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Reason: CGPA too low
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* STATS */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase />
                Applied Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">12</p>
              <p className="text-sm text-gray-500">
                companies applied to
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Offer Received</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <img
                src="https://via.placeholder.com/50"
                alt="Company"
                className="rounded-lg"
              />
              <div>
                <p className="font-bold">Software Engineer</p>
                <p className="text-gray-500">Innovatech Solutions</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock />
                Upcoming Campus Drives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-medium">
                Quantum Dynamics – Oct 25, 2024
              </p>
              <p className="font-medium">
                NexGen Robotics – Nov 2, 2024
              </p>
              <Button variant="link">View all</Button>
            </CardContent>
          </Card>
        </div>
     

      </main>
    </div>
  );
}
