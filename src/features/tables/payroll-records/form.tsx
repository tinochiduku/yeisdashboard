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
import { payrollRecords } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

const formSchema = z.object({
  payrollMonth: z.string(),
  grossSalary: z.coerce.number(),
  netSalary: z.coerce.number(),
  status: z.string()
});

export default function PayrollRecordForm({
  initialData,
  pageTitle
}: {
  initialData: InferSelectModel<typeof payrollRecords> | null;
  pageTitle: string;
}) {
  const defaultValues = {
    payrollMonth: initialData?.payrollMonth || '',
    grossSalary: initialData?.grossSalary || 0,
    netSalary: initialData?.netSalary || 0,
    status: initialData?.status || ''
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
                name='payrollMonth'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payroll Month</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter payroll month' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='grossSalary'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gross Salary</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='netSalary'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Net Salary</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter status' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit'>Add Record</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}