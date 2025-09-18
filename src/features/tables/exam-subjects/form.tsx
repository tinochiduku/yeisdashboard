'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { examSubjects } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

const formSchema = z.object({
  maxMarks: z.coerce.number(),
  passMarks: z.coerce.number(),
  examDate: z.string()
});

export default function ExamSubjectForm({
  initialData,
  pageTitle
}: {
  initialData: InferSelectModel<typeof examSubjects> | null;
  pageTitle: string;
}) {
  const defaultValues = {
    maxMarks: initialData?.maxMarks || 0,
    passMarks: initialData?.passMarks || 0,
    examDate: initialData?.examDate || ''
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    //@ts-ignore
    values: defaultValues
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Form submission logic would be implemented here
  }

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='maxMarks'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Marks</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='passMarks'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pass Marks</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='examDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Date</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit'>Add Exam Subject</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}