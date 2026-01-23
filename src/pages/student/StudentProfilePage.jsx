import React, { useEffect, useState } from "react";
import { AppHeader } from "../../components/app-header/AppHeader";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { getStudentProfile } from "../../services/resumeService";
import { SparrowLoader } from "../../components/sparrow-loader";

const StudentProfilePage = () => {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getStudentProfile(); // call your API
                if (response?.success) {
                    const profile = response.data;
                    setStudent(profile);
                    setLoading(false);
                } else {
                    console.warn("Profile fetch failed:", response?.message);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className="flex min-h-screen w-full flex-col">
            <AppHeader title="My Profile" />

            {loading ? (
                <div className="flex items-center justify-center h-full w-full">
                    <SparrowLoader text="Loading students..." />
                </div>
            ) :
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src="" />
                                    <AvatarFallback>{student?.user.name?.charAt(0).toUpperCase() || "S"}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="font-headline text-2xl">{student.user.name}</CardTitle>
                                    <CardDescription>Student ID: {student?.studentProfile?.registrationNumber}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <section>
                                <h3 className="font-headline text-xl mb-4">Personal Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" defaultValue={student?.user?.name} readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" defaultValue={student?.user?.email} readOnly />
                                    </div>
                                </div>
                            </section>
                            <section>
                                <h3 className="font-headline text-xl mb-4">Academic Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>CGPA</Label>
                                        <Input defaultValue={student?.studentProfile?.cgpa} readOnly />
                                        <p className="text-xs text-muted-foreground">Academic details are read-only.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Backlogs</Label>
                                        <Input defaultValue={student?.studentProfile?.backlogs} readOnly />
                                    </div>
                                </div>
                            </section>
                        </CardContent>
                    </Card>
                </main>
            }
        </div>
    );
};

export default StudentProfilePage;
