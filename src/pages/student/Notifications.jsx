import React from "react";

import { AppHeader } from "../../components/app-header/AppHeader";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";

import { Bell, Briefcase, FileCheck } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

import { Button } from "../../components/ui/button";

const StudentNotificationsPage = () => {
  const notifications = [
    {
      icon: <Bell className="h-6 w-6 text-green-500" />,
      title: "Offer from Innovatech Solutions!",
      description:
        "Congratulations! You have received an offer for the Software Engineer role.",
      time: "2 hours ago",
      read: false,
    },
    {
      icon: <Briefcase className="h-6 w-6 text-blue-500" />,
      title: "New Job Match Scientist",
      description:
        "A new job from Quantum Dynamics matches your profile.",
      time: "1 day ago",
      read: false,
    },
    {
      icon: <FileCheck className="h-6 w-6 text-yellow-500" />,
      title: "Application Status Update",
      description:
        "Your application for Robotics Engineer at NexGen has moved to the next round.",
      time: "3 days ago",
      read: false,
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader title="Notifications" />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">
              Your Alerts
            </CardTitle>
            <CardDescription>
              Stay updated on job alerts and offer updates.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 p-4 rounded-lg ${
                  !notification.read ? "bg-secondary" : ""
                }`}
              >
                <Avatar className="h-10 w-10 border">
                  <div className="flex h-full w-full items-center justify-center">
                    {notification.icon}
                  </div>
                </Avatar>

                <div className="flex-grow">
                  <p className="font-semibold">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </p>
                </div>

                {!notification.read && (
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default StudentNotificationsPage;
