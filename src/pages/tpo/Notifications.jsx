import React from "react";
import { AppHeader } from "../../components/app-header/AppHeader";
import { Avatar } from "../../components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Bell, Building, CheckCircle } from "lucide-react";

export default function TpoNotificationsPage() {
  const notifications = [
    {
      icon: <Bell className="h-6 w-6 text-primary" />,
      title: "New Announcement from Admin",
      description:
        "An announcement regarding the academic calendar has been posted.",
      time: "1 hour ago",
      read: false,
    },
    {
      icon: <Building className="h-6 w-6 text-blue-500" />,
      title: "Innovatech has scheduled a drive",
      description:
        "The campus drive for Innovatech Solutions is scheduled for October 28, 2024.",
      time: "1 day ago",
      read: false,
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      title: "Collaboration with Quantum Dynamics confirmed",
      description:
        "Quantum Dynamics has accepted the invitation for campus recruitment.",
      time: "3 days ago",
      read: true,
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader title="Notifications" />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Inbox</CardTitle>
            <CardDescription>
              Stay updated with important notifications and alerts.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {notifications.map((n, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 rounded-lg p-4 ${
                  !n.read ? "bg-secondary" : ""
                }`}
              >
                <Avatar className="h-10 w-10 border flex items-center justify-center">
                  {n.icon}
                </Avatar>

                <div className="flex-1">
                  <p className="font-semibold">{n.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {n.description}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {n.time}
                  </p>
                </div>

                {!n.read && (
                  <div className="mt-2 h-2 w-2 rounded-full bg-primary" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
