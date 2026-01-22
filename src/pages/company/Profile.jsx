import { AppHeader } from "../../components/app-header/AppHeader";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
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

export default function CompanyProfilePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader title="Company Profile" />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://images.unsplash.com/photo-1662052955098-042b46e60c2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx0ZWNoJTIwbG9nb3xlbnwwfHx8fDE3Njg0MTI4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080" />
                <AvatarFallback>IS</AvatarFallback>
              </Avatar>

              <div>
                <CardTitle className="font-headline text-2xl">
                  Innovatech Solutions
                </CardTitle>
                <CardDescription>
                  Pioneering the future of technology.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Company Details */}
            <section>
              <h3 className="font-headline text-xl mb-4">
                Company Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    defaultValue="Innovatech Solutions"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    defaultValue="https://innovatech.com"
                  />
                </div>
              </div>
            </section>

            {/* HR Info */}
            <section>
              <h3 className="font-headline text-xl mb-4">
                HR Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="hr-name">HR Name</Label>
                  <Input defaultValue="Jane Doe" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hr-email">HR Email Address</Label>
                  <Input
                    type="email"
                    defaultValue="jane.doe@innovatech.com"
                  />
                </div>
              </div>
            </section>

            <Button>
              <Pen className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
