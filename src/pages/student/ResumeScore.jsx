import { useState } from 'react';
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
import { Badge } from '../../components/ui/badge';

import { Sparkles, Wand2, AlertCircle, CheckCircle, TrendingUp, AlertTriangle } from 'lucide-react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '../../components/ui/alert';
import { SparrowLoader } from "../../components/sparrow-loader";

export default function ResumeScore() {
  // Mock ATS evaluation data - this would come from API in real implementation
  const [atsData, setAtsData] = useState({});
  const [loading, setLoading] = useState(false);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader
        title="AI Resume Score"
        description="Get your resume scored and receive job-specific suggestions."
      />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <ResumeEnhancer onResult={setAtsData} onLoading={setLoading} />
          </div>

          <div>
            <Card className="min-h-[460px]">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Sparkles className="text-primary" />
                  ATS Evaluation Results
                </CardTitle>
                <CardDescription>
                  Your resume evaluation based on the provided job description.
                </CardDescription>
              </CardHeader>

              {loading ? <><div className="flex items-center justify-center h-full w-full">
                <SparrowLoader text="Loading ATS Score..." />
              </div></> : <>
                {Object.keys(atsData).length !== 0 ?
                  <CardContent className="space-y-6">
                    {/* Overall ATS Score Section */}
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <p className={`text-6xl font-bold ${getScoreColor(atsData.ats_score)}`}>
                          {atsData.ats_score}
                        </p>
                        <span className="text-2xl text-muted-foreground">/ 100</span>
                      </div>
                      <p className="text-muted-foreground mb-4">Overall ATS Score</p>
                      <Progress value={atsData.ats_score} className="mt-4" />
                    </div>

                    {/* Score Breakdown Section */}
                    <div>
                      <h3 className="font-headline text-lg mb-4 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Score Breakdown
                      </h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Skills Match Score</span>
                            <span className="text-sm text-muted-foreground">{atsData.skills_match_score}/100</span>
                          </div>
                          <Progress value={atsData.skills_match_score} />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Experience Relevance Score</span>
                            <span className="text-sm text-muted-foreground">{atsData.experience_relevance_score}/100</span>
                          </div>
                          <Progress value={atsData.experience_relevance_score} />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Tools & Keywords Score</span>
                            <span className="text-sm text-muted-foreground">{atsData.tools_keywords_score}/100</span>
                          </div>
                          <Progress value={atsData.tools_keywords_score} />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Resume Clarity Score</span>
                            <span className="text-sm text-muted-foreground">{atsData.resume_clarity_score}/100</span>
                          </div>
                          <Progress value={atsData.resume_clarity_score} />
                        </div>
                      </div>
                    </div>

                    {/* Missing Skills Section */}
                    <div>
                      <h3 className="font-headline text-lg mb-4 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        Missing Skills
                      </h3>
                      {atsData.missing_skills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {atsData.missing_skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">No critical skills missing 🎉</span>
                        </div>
                      )}
                    </div>

                    {/* Weak Areas Section */}
                    <div>
                      <h3 className="font-headline text-lg mb-4 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                        Weak Areas
                      </h3>
                      <ul className="space-y-3">
                        {atsData.weak_areas.map((area, index) => (
                          <li key={index} className="flex gap-3">
                            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                            <span className="text-sm text-muted-foreground">{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Improvement Suggestions Section */}
                    <div>
                      <h3 className="font-headline text-lg mb-4 flex items-center gap-2">
                        <Wand2 className="h-5 w-5 text-blue-600" />
                        Suggestions to Improve Your Resume
                      </h3>
                      <ol className="space-y-3">
                        {atsData.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex gap-3">
                            <div className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                              {index + 1}
                            </div>
                            <span className="text-sm text-muted-foreground">{suggestion}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <Alert>
                      <Wand2 className="h-4 w-4" />
                      <AlertTitle>Did you know?</AlertTitle>
                      <AlertDescription>
                        Our 'Resume Enhancer' tool can automatically apply these suggestions for you!
                      </AlertDescription>
                    </Alert>
                  </CardContent> :
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <p className="text-6xl font-bold text-primary">80</p>
                      <p className="text-muted-foreground">out of 100</p>
                      <Progress value={80} className="mt-4" />
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
                }</>}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}