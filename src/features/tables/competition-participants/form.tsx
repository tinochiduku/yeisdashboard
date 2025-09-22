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
import { competitionParticipants } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

const formSchema = z.object({
  registrationDate: z.string(),
  participationStatus: z.string(),
  result: z.string()
});

export default function CompetitionParticipantForm({
  initialData,
  pageTitle
}: {
  initialData: InferSelectModel<typeof competitionParticipants> | null;
  pageTitle: string;
}) {
  const defaultValues = {
    registrationDate: initialData?.registrationDate || '',
    participationStatus: initialData?.participationStatus || '',
    result: initialData?.result || ''
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    //@ts-ignore
    defaultValues
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
                name='registrationDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Date</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='participationStatus'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Participation Status</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter status' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='result'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Result</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter result' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit'>Add Participant</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}