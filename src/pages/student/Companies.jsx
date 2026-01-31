import React from "react";
import { Link } from "react-router-dom";

import { AppHeader } from "../../components/app-header/AppHeader";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../components/ui/card";

import { Button } from "../../components/ui/button";

import { companies } from "../../lib/companies";
import { PlaceHolderImages } from "../../lib/placeholder-images";

const StudentCompaniesPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader
        title="Companies"
        description="Discover companies and their placement opportunities."
      />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => {
            const logo = PlaceHolderImages.find(
              (p) => p.id === company.logo
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

                  <CardTitle className="font-headline pt-4">
                    {company.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-grow text-center">
                  <CardDescription>
                    {company.description}
                  </CardDescription>
                </CardContent>

                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link to={`/student/companies/${company.id}`}>
                      View Profile
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default StudentCompaniesPage;
