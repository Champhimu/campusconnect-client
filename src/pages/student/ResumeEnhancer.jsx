import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2, Sparkles } from "lucide-react";

import { AppHeader } from "../../components/app-header/AppHeader";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";

import { enhanceResume } from "../../services/resumeServices";

/* ------------------ ZOD SCHEMA ------------------ */
const resumeSchema = z.object({
  resumeText: z
    .string()
    .min(100, "Please enter a more detailed resume (min 100 characters)."),
  jobDescription: z
    .string()
    .min(
      100,
      "Please enter a more detailed job description (min 100 characters)."
    ),
});

const ResumeEnhancer = () => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);

  const form = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      resumeText: "",
      jobDescription: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setSuggestions(null);

      const result = await enhanceResume(data);
      setSuggestions(result || []);
    } catch (error) {
      alert("Failed to enhance resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader title="AI Resume Enhancer" />

      <main className="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* FORM */}
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>
                Paste your resume and job description below
              </CardDescription>
            </CardHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="resumeText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Resume</FormLabel>
                        <FormControl>
                          <Textarea rows={10} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="jobDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Description</FormLabel>
                        <FormControl>
                          <Textarea rows={10} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>

                <CardFooter>
                  <Button type="submit" disabled={loading}>
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Enhance Resume
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>

          {/* RESULT */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles />
                AI Suggestions
              </CardTitle>
              <CardDescription>
                Suggestions to improve your resume
              </CardDescription>
            </CardHeader>

            <CardContent>
              {loading && (
                <div className="flex justify-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              )}

              {!loading && suggestions && (
                <ul className="space-y-4">
                  {suggestions.map((item, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {!loading && !suggestions && (
                <div className="flex h-[250px] items-center justify-center border border-dashed rounded">
                  <p className="text-muted-foreground">
                    Suggestions will appear here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ResumeEnhancer;
