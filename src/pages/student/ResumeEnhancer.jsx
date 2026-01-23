import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { enhanceResume } from '../../api/enhanceResume';

import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';

import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import axiosInstance from '../../api/axiosInstance';

const resumeSchema = z.object({
  jobDescription: z
    .string()
    .min(100, 'Please enter a more detailed job description (min 100 characters).'),
});

export default function ResumeEnhancer({onResult, onLoading}) {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const [atsResult, setAtsResult] = useState();

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      jobDescription: '',
    },
  });

  const onSubmit = async (formData) => {
    console.log("SUBMIT CALLED")
    try {
      onLoading?.(true);

      // Call the backend API
      const response = await axiosInstance.post('/student/resume/evaluate-ats', {
        job_description: formData.jobDescription,
      });

      console.log("response", response);

      if (response.data.result) {
        setAtsResult(response.data.result);
        onResult?.(response.data.result);
        onLoading?.(false);
        toast({
          title: 'ATS Evaluation Complete',
          description: 'See the results below.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'ATS Evaluation Failed',
          description: response.data?.message || 'Unknown error occurred.',
        });
      }
    } catch (error) {
      console.error('ATS evaluation error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to evaluate ATS.',
      });
    } finally {
      onLoading?.(false);
    }
  };

  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Information</CardTitle>
          <CardDescription>
            Paste the job description below to get your resume scored and receive job-specific suggestions.
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">

              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste the job description here..."
                        rows={10}
                        {...field}
                        disabled={onLoading}
                        className="thin-scrollbar"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                {isPending ? 'Analyzing...' : 'Enhance My Resume'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
