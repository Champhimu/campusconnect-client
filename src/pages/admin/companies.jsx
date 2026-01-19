import React from "react";
import { AppHeader } from "../../components/app-header/AppHeader";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

// temporary static data (jab tak backend nahi hai)
const companies = [
  { id: 1, name: "Google" },
  { id: 2, name: "Microsoft" },
  { id: 3, name: "Amazon" },
];

export default function AdminCompaniesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader
        title="Companies"
        description="View companies that have accepted campus drive invitations."
      />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <Card key={company.id}>
              <CardHeader>
                <CardTitle className="text-xl">{company.name}</CardTitle>
                <CardDescription>Academic Year: 2024‑2025</CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Invitation sent by:{" "}
                  <span className="font-medium text-foreground">
                    TPO Name
                  </span>
                </p>
              </CardContent>

              <CardContent className="flex justify-end">
              <Button variant="outline" size="sm">
                     View Details
                      </Button>
                 </CardContent>

            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
