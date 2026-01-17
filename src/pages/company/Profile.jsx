

import { AppHeader } from "../../components/app-header/AppHeader";




import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Pen } from "lucide-react";

export default function CompanyProfile() {
  return (
    <div className="min-h-screen">
      <AppHeader title="Company Profile" />

      <main className="p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://picsum.photos/200" />
                <AvatarFallback>IS</AvatarFallback>
              </Avatar>

              <div>
                <CardTitle>Innovatech Solutions</CardTitle>
                <CardDescription>
                  Pioneering the future of technology.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Label>Company Name</Label>
            <Input defaultValue="Innovatech Solutions" />

            <Button className="mt-4">
              <Pen size={14} className="mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
