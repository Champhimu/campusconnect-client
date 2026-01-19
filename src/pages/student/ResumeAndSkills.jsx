import React from "react";
import { AppHeader } from "../../components/app-header/AppHeader";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Upload, X, CheckCircle } from "lucide-react";

export default function ResumeAndSkillsPage() {
    const skills = ["React", "TypeScript", "Node.js", "Python", "SQL"];

    return (
        <div className="flex min-h-screen w-full flex-col">
            <AppHeader title="Resume & Skills" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Manage Your Profile</CardTitle>
                        <CardDescription>Keep your resume and skills up to date to improve your placement chances.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {/* Resume Upload Section */}
                        <section>
                            <h3 className="font-headline text-xl mb-4">Resume Upload</h3>
                            <div className="flex items-center gap-4">
                                <Label htmlFor="resume-upload" className="flex-grow">
                                    <div className="flex h-32 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border text-center">
                                        <div className="space-y-1">
                                            <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                                            <p className="text-muted-foreground">Click to upload or drag and drop</p>
                                            <p className="text-xs text-muted-foreground">PDF (max. 5MB)</p>
                                        </div>
                                    </div>
                                </Label>
                                <Input id="resume-upload" type="file" className="hidden" />
                            </div>
                            <p className="text-sm mt-2 text-muted-foreground">
                                Current resume: <span className="font-medium text-primary">AlexDoe_Resume_2024.pdf</span>
                            </p>
                        </section>

                        {/* Skills Section */}
                        <section>
                            <h3 className="font-headline text-xl mb-4">Skills</h3>
                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <Input placeholder="Add a new skill" />
                                    <Button>Add</Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map(skill => (
                                        <Badge key={skill} variant="secondary" className="text-base">
                                            {skill}
                                            <Button variant="ghost" size="icon" className="h-auto w-auto ml-2">
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Consent & Verification Section */}
                        <section>
                            <h3 className="font-headline text-xl mb-4">Consent & Verification</h3>
                            <div className="flex items-center space-x-2 mb-4">
                                <Checkbox id="share-profile" />
                                <Label htmlFor="share-profile">Allow automated job applications on my behalf based on my profile.</Label>
                            </div>
                            <div className="flex items-center">
                                <Badge>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Profile Verified
                                </Badge>
                            </div>
                        </section>

                        <Button>Update Profile</Button>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
