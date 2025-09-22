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
import { transportAllocations } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  pickupPoint: z.string(),
  dropPoint: z.string(),
  monthlyFee: z.coerce.number(),
  allocationDate: z.string(),
  isActive: z.boolean().default(true)
});

export default function TransportAllocationForm({
  initialData,
  pageTitle
}: {
  initialData: InferSelectModel<typeof transportAllocations> | null;
  pageTitle: string;
}) {
  const defaultValues = {
    pickupPoint: initialData?.pickupPoint || '',
    dropPoint: initialData?.dropPoint || '',
    monthlyFee: initialData?.monthlyFee || 0,
    allocationDate: initialData?.allocationDate || '',
    isActive: initialData?.isActive || true
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
                name='pickupPoint'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Point</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter pickup point' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='dropPoint'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Drop Point</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter drop point' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='monthlyFee'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Fee</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='allocationDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allocation Date</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isActive'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>
                        Active
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit'>Add Allocation</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}