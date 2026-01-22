import { useTransition } from 'react';
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

const resumeSchema = z.object({
  resumeText: z
    .string()
    .min(100, 'Please enter a more detailed resume (min 100 characters).'),
  jobDescription: z
    .string()
    .min(100, 'Please enter a more detailed job description (min 100 characters).'),
});

export default function ResumeEnhancer() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      resumeText: '',
      jobDescription: '',
    },
  });

  const onSubmit = (data) => {
    startTransition(async () => {
      const result = await enhanceResume(data);

      if (!result?.success) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result?.error || 'An unknown error occurred.',
        });
      }
    });
  };

  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Information</CardTitle>
          <CardDescription>
            Paste your resume and the job description below.
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
                      <Textarea
                        placeholder="Paste your resume text here..."
                        rows={10}
                        {...field}
                      />
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
                      <Textarea
                        placeholder="Paste the job description here..."
                        rows={10}
                        {...field}
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
