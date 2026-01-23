import React, { useState, useRef, useEffect } from "react";
import { AppHeader } from "../../components/app-header/AppHeader";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Upload, X, CheckCircle, Loader2 } from "lucide-react";
import { uploadResumeAndExtractSkills, updateStudentProfile, getStudentProfile } from "../../services/resumeService";
import { SparrowLoader } from "../../components/sparrow-loader";

export default function ResumeAndSkillsPage() {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState("AlexDoe_Resume_2024.pdf");
    const [autoApplyConsent, setAutoApplyConsent] = useState(false); // default unchecked
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getStudentProfile(); // call your API
                if (response?.success) {
                    setLoading(false);
                    const profile = response.data;
                    setUploadedFileName(profile?.resume?.originalName || "No resume uploaded");
                    setSkills(profile?.studentProfile?.skills || []);
                    setAutoApplyConsent(profile?.studentProfile?.autoApplyConsent || false);
                } else {
                    setLoading(false);
                    console.warn("Profile fetch failed:", response?.message);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);

    const handleUpdateProfile = async () => {
        const payload = {
            skills,
            autoApplyConsent,
        };

        console.log("Updating profile with payload:", payload);
        try {
            const response = await updateStudentProfile(payload);
            alert("Profile updated successfully!");

        } catch (error) {
            console.error("Profile update error:", error);
            const errorMessage = error.message || "Failed to update profile. Please try again.";
            alert(errorMessage);
        }
    }

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (file.type !== "application/pdf") {
            alert("Please upload a PDF file only.");
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("File size must be less than 5MB.");
            return;
        }

        try {
            setIsUploading(true);
            const response = await uploadResumeAndExtractSkills(file);

            // Update uploaded file name
            setUploadedFileName(file.name);

            // Extract skills from response and add to existing skills
            if (response.extractedSkills && Array.isArray(response.extractedSkills)) {
                const uniqueNewSkills = response.extractedSkills.filter(
                    skill => !skills.includes(skill)
                );

                if (uniqueNewSkills.length > 0) {
                    setSkills(prevSkills => [...prevSkills, ...uniqueNewSkills]);
                }
            }

            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

        } catch (error) {
            console.error("Resume upload error:", error);
            const errorMessage = error.message || "Failed to upload resume. Please try again.";
            alert(errorMessage);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleAddSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill("");
        } else {
            alert(`${newSkill} already exists`);
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddSkill();
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-col">
            <AppHeader title="Resume & Skills" />
            {loading ? (
                <div className="flex items-center justify-center h-full w-full">
                    <SparrowLoader text="Loading data..." />
                </div>
            ) :
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
                                        <div className={`flex h-32 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed ${isUploading ? 'border-muted bg-muted/50' : 'border-border'} text-center`}>
                                            {isUploading ? (
                                                <div className="space-y-2">
                                                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                                                    <p className="text-sm font-medium">Uploading and extracting skills...</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-1">
                                                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                                                    <p className="text-muted-foreground">Click to upload or drag and drop</p>
                                                    <p className="text-xs text-muted-foreground">PDF (max. 5MB)</p>
                                                </div>
                                            )}
                                        </div>
                                    </Label>
                                    <Input
                                        ref={fileInputRef}
                                        id="resume-upload"
                                        type="file"
                                        className="hidden"
                                        accept=".pdf,application/pdf"
                                        onChange={handleFileUpload}
                                        disabled={isUploading}
                                    />
                                </div>
                                <p className="text-sm mt-2 text-muted-foreground">
                                    Current resume: <span className="font-medium text-primary">{uploadedFileName}</span>
                                </p>
                            </section>

                            {/* Skills Section */}
                            <section>
                                <h3 className="font-headline text-xl mb-4">Skills</h3>
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Add a new skill"
                                            value={newSkill}
                                            onChange={(e) => setNewSkill(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            disabled={isUploading}
                                        />
                                        <Button
                                            onClick={() => handleAddSkill()}
                                            disabled={isUploading}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {skills?.map(skill => (
                                            <Badge key={skill} variant="secondary" className="text-base">
                                                {skill}
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-auto w-auto ml-2"
                                                    onClick={() => handleRemoveSkill(skill)}
                                                    disabled={isUploading}
                                                >
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
                                    <Checkbox id="share-profile"
                                        checked={autoApplyConsent}
                                        onCheckedChange={(checked) => setAutoApplyConsent(checked)}
                                    />
                                    <Label htmlFor="share-profile">Allow automated job applications on my behalf based on my profile.</Label>
                                </div>
                                <div className="flex items-center">
                                    <Badge>
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Profile Verified
                                    </Badge>
                                </div>
                            </section>

                            <Button disabled={isUploading} onClick={() => handleUpdateProfile()}>Update Profile</Button>
                        </CardContent>
                    </Card>
                </main>
            }
        </div>
    );
}
