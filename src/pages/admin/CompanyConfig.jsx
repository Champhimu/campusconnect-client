import { AppHeader } from "../../components/app-header/AppHeader";
import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { companies, jobs } from "../../lib/data";

export default function CompanyConfigPage() {
  const company = companies[0];
  const job = jobs[0];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader
        title="Company Configuration"
        description="Manage eligibility criteria and rules for companies."
      />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">
                {company?.name}
              </CardTitle>
              <CardDescription>
                {job?.title}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Eligibility */}
              <div>
                <h4 className="font-semibold text-sm mb-2">
                  Eligibility Criteria
                </h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>
                    Minimum CGPA:
                    <span className="ml-1 font-medium text-foreground">
                      7.5
                    </span>
                  </li>
                  <li>
                    Maximum Backlogs:
                    <span className="ml-1 font-medium text-foreground">
                      0
                    </span>
                  </li>
                </ul>
              </div>

              {/* Branches */}
              <div>
                <h4 className="font-semibold text-sm mb-2">
                  Allowed Branches
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Computer Science</Badge>
                  <Badge variant="secondary">Information Technology</Badge>
                </div>
              </div>

              {/* Academic Years */}
              <div>
                <h4 className="font-semibold text-sm mb-2">
                  Allowed Academic Years
                </h4>
                <div className="flex gap-2">
                  <Badge variant="secondary">2025</Badge>
                </div>
              </div>

              {/* Offer Rules */}
              <div>
                <h4 className="font-semibold text-sm mb-2">
                  Offer Rules
                </h4>
                <p className="text-sm text-muted-foreground">
                  Single Offer Allowed
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
