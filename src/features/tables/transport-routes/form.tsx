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
import { transportRoutes } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  routeName: z.string(),
  routeCode: z.string(),
  startPoint: z.string(),
  endPoint: z.string(),
  distance: z.coerce.number(),
  monthlyFee: z.coerce.number(),
  isActive: z.boolean().default(true)
});

export default function TransportRouteForm({
  initialData,
  pageTitle
}: {
  initialData: InferSelectModel<typeof transportRoutes> | null;
  pageTitle: string;
}) {
  const defaultValues = {
    routeName: initialData?.routeName || '',
    routeCode: initialData?.routeCode || '',
    startPoint: initialData?.startPoint || '',
    endPoint: initialData?.endPoint || '',
    distance: initialData?.distance || 0,
    monthlyFee: initialData?.monthlyFee || 0,
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
                name='routeName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Route Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter route name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='routeCode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Route Code</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter route code' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='startPoint'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Point</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter start point' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='endPoint'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Point</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter end point' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='distance'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Distance</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
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
            <Button type='submit'>Add Route</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}