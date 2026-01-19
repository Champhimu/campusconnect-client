import React from "react";
import { AppHeader } from "../../components/app-header/AppHeader";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Pen } from "lucide-react";

const StudentProfilePage = () => {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <AppHeader title="My Profile" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="https://picsum.photos/seed/student-avatar/100/100" />
                                <AvatarFallback>S</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="font-headline text-2xl">Alex Doe</CardTitle>
                                <CardDescription>Student ID: 12345</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <section>
                            <h3 className="font-headline text-xl mb-4">Personal Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" defaultValue="Alex Doe" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue="alex.doe@example.com" />
                                </div>
                            </div>
                        </section>
                        <section>
                            <h3 className="font-headline text-xl mb-4">Academic Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>CGPA</Label>
                                    <Input defaultValue="8.5" readOnly />
                                    <p className="text-xs text-muted-foreground">Academic details are read-only.</p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Backlogs</Label>
                                    <Input defaultValue="0" readOnly />
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
};

export default StudentProfilePage;
