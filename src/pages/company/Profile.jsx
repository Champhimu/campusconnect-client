import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
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
import { useSelector } from "react-redux";

export default function CompanyProfilePage() {
  // const [company, setCompany] = useState(null);
  // const [loading, setLoading] = useState(true);
  const { user, loading } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   const fetchCompanyProfile = async () => {
  //     try {
  //       const { data } = await axiosInstance.get("/company/companyProfile");

  //       if (data.organizationType !== "CompanyProfile") return;
  //       console.log(data);
  //       setCompany(data.organizationProfile);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCompanyProfile();
  // }, []);

  // if (!company) return <p className="p-8">Company profile not found</p>;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader title="Company Profile" />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.organization.logoUrl || ""} />
                <AvatarFallback>{user.organization.companyName?.[0]}</AvatarFallback>
              </Avatar>

              <div>
                <CardTitle className="font-headline text-2xl">
                  {user.organization.companyName}
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
                    defaultValue={user.organization.companyName}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    defaultValue= {user.organization.companyWebsite}
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
                  <Input defaultValue={user.name} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hr-email">HR Email Address</Label>
                  <Input
                    type="email"
                    defaultValue={user.organization.contactPhone}
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
