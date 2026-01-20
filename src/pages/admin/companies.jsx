import React from "react";
import { AppHeader } from "../../components/app-header/AppHeader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { companies } from "../../lib/data";
import { PlaceHolderImages } from "../../lib/placeholder-images";

export default function AdminCompaniesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader
        title="Companies"
        description="View companies that have accepted campus drive invitations."
      />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => {
            const logo = PlaceHolderImages.find(
              (p) => p.id === company.logo
            );

            return (
              <Card key={company.id}>
                <CardHeader className="flex-row items-center gap-4">
                  {logo && (
                    <img
                      src={logo.imageUrl}
                      alt={`${company.name} logo`}
                      width={48}
                      height={48}
                      className="rounded-lg"
                    />
                  )}

                  <div>
                    <CardTitle className="font-headline text-xl">
                      {company.name}
                    </CardTitle>
                    <CardDescription>
                      Academic Year: 2024-2025
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Invitation sent by:{" "}
                    <span className="font-medium text-foreground">
                      TPO Name
                    </span>
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  );
}
