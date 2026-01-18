import React from "react";
import { Briefcase, CheckCircle, Clock, XCircle } from "lucide-react";

import { AppHeader } from "../../components/app-header/AppHeader";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";


import { companies } from "../../lib/companies";
import { PlaceHolderImages } from '../../lib/placeholder-images';


const StudentDashboard = () => {
  const nextCompanies = companies.slice(0, 5);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader title="Dashboard" />

      <main className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
        {/* Eligibility Status */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Eligibility Status
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {nextCompanies.map((company, index) => {
              const logo = PlaceHolderImages.find(
                (p) => p.id === company.logo
              );
              const isEligible = index % 2 === 0;

              return (
                <Card key={company.id}>
                  <div className="flex items-center gap-4 p-4">
                    {logo && (
                      <img
                        src={logo.imageUrl}
                        alt={company.name}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                    )}
                    <h3 className="text-lg font-medium">
                      {company.name}
                    </h3>
                  </div>

                  <div className="p-4 pt-0">
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
                        Reason too low
                      </p>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Stats Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <div className="p-4">
              <h3 className="flex items-center gap-2 text-lg font-medium">
                <Briefcase className="text-primary" />
                Applied Jobs
              </h3>
              <p className="text-4xl font-bold">12</p>
              <p className="text-sm text-gray-500">
                companies applied to
              </p>
            </div>
          </Card>

          <Card>
            <div className="p-4 flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1662052955098-042b46e60c2b"
                alt="Innovatech"
                className="h-12 w-12 rounded-lg object-cover"
              />
              <div>
                <p className="font-bold">Software Engineer</p>
                <p className="text-gray-500">
                  Innovatech Solutions
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-4">
              <h3 className="flex items-center gap-2 text-lg font-medium">
                <Clock className="text-primary" />
                Upcoming Campus Drives
              </h3>

              <div className="space-y-2 mt-2">
                <p className="font-medium">
                  Quantum Dynamics – Oct 25, 2024
                </p>
                <p className="font-medium">
                  NexGen Robotics – Nov 2, 2024
                </p>
                <Button variant="link" className="p-0 h-auto">
                  View all
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
