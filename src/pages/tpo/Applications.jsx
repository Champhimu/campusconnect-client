import { AppHeader } from "../../components/app-header/AppHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { companies } from "../../lib/data";

export default function TpoApplicationsPage() {
  const stats = [
    {
      companyId: "innovatech-solutions",
      applied: 150,
      shortlisted: 45,
      selected: 15,
    },
    {
      companyId: "quantum-dynamics",
      applied: 80,
      shortlisted: 25,
      selected: 5,
    },
    {
      companyId: "nexgen-robotics",
      applied: 120,
      shortlisted: 30,
      selected: 10,
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader
        title="Applications"
        description="View application statistics for each campus drive."
      />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const company = companies.find(
              (c) => c.id === stat.companyId
            );

            return (
              <Card key={stat.companyId}>
                <CardHeader>
                  <CardTitle>{company ? company.name : "Company"}</CardTitle>
                  <CardDescription>Application Funnel</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Applied</span>
                      <span className="text-sm">{stat.applied}</span>
                    </div>
                    <Progress value={(stat.applied / 200) * 100} />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Shortlisted</span>
                      <span className="text-sm">{stat.shortlisted}</span>
                    </div>
                    <Progress
                      value={(stat.shortlisted / stat.applied) * 100}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Selected</span>
                      <span className="text-sm">{stat.selected}</span>
                    </div>
                    <Progress
                      value={(stat.selected / stat.shortlisted) * 100}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
