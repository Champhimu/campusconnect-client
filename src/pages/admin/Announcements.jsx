
import React from "react";

import { AppHeader } from "../../components/app-header/AppHeader";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Paperclip, Send } from "lucide-react";

export default function AnnouncementsPage() {
  const departments = [
    "Computer Science",
    "Mechanical",
    "Electronics",
    "Civil",
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader
        title="Announcements"
        description="Create and send announcements to students."
      />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">
              New Announcement
            </CardTitle>
            <CardDescription>
              Create and send announcements to students.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g., Campus Drive for Innovatech"
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your announcement here..."
                rows={8}
              />
            </div>

            {/* Target Audience */}
            <div className="space-y-4">
              <Label>Target Audience</Label>

              <div className="flex items-center space-x-2">
                <Checkbox id="all-students" defaultChecked />
                <Label htmlFor="all-students">All Students</Label>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {departments.map((dept) => {
                  const id = dept.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <div key={dept} className="flex items-center space-x-2">
                      <Checkbox id={id} />
                      <Label htmlFor={id}>{dept}</Label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Attachment */}
            <div className="space-y-2">
              <Label htmlFor="attachment">Attachment</Label>
              <div className="flex items-center gap-2">
                <Input id="attachment" type="file" className="max-w-xs" />
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Attach PDF or DOC files (e.g., selected student lists).
              </p>
            </div>

            {/* Send Button */}
            <Button className="flex items-center gap-2 mt-4">
              <Send className="h-4 w-4" />
              Send Announcement
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
