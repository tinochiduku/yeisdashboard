'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { siblings } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

const formSchema = z.object({
});

export default function SiblingForm({
  initialData,
  pageTitle
}: {
  initialData: InferSelectModel<typeof siblings> | null;
  pageTitle: string;
}) {
  const defaultValues = {
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
            <Button type='submit'>Add Sibling</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}