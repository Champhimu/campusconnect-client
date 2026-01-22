import { AppHeader } from '../../components/app-header/AppHeader';
import ResumeEnhancer from './ResumeEnhancer';


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';

import { Progress } from '../../components/ui/progress';

import { Sparkles, Wand2 } from 'lucide-react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '../../components/ui/alert';

export default function ResumeScore() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader
        title="AI Resume Score"
        description="Get your resume scored and receive job-specific suggestions."
      />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <ResumeEnhancer/>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Sparkles className="text-primary" />
                  ATS Score & Suggestions
                </CardTitle>
                <CardDescription>
                  Your score is based on the resume and job description provided.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-6xl font-bold text-primary">88</p>
                  <p className="text-muted-foreground">out of 100</p>
                  <Progress value={88} className="mt-4" />
                </div>

                <div>
                  <h3 className="font-headline text-lg mb-2">
                    Improvement Suggestions
                  </h3>

                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">
                        Add more quantifiable achievements to your project descriptions.
                      </span>
                    </li>

                    <li className="flex gap-3">
                      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">
                        Include keywords from the job description like 'CI/CD' and 'Agile'.
                      </span>
                    </li>

                    <li className="flex gap-3">
                      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">
                        Tailor your summary to highlight your passion for frontend development.
                      </span>
                    </li>
                  </ul>
                </div>

                <Alert>
                  <Wand2 className="h-4 w-4" />
                  <AlertTitle>Did you know?</AlertTitle>
                  <AlertDescription>
                    Our 'Resume Enhancer' tool can automatically apply these suggestions for you!
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}


