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
import { transportVehicles } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  vehicleNumber: z.string(),
  vehicleType: z.string(),
  capacity: z.coerce.number(),
  insuranceExpiry: z.string(),
  permitExpiry: z.string(),
  fitnessExpiry: z.string(),
  fuelType: z.string(),
  averageMileage: z.coerce.number(),
  isActive: z.boolean().default(true)
});

export default function TransportVehicleForm({
  initialData,
  pageTitle
}: {
  initialData: InferSelectModel<typeof transportVehicles> | null;
  pageTitle: string;
}) {
  const defaultValues = {
    vehicleNumber: initialData?.vehicleNumber || '',
    vehicleType: initialData?.vehicleType || '',
    capacity: initialData?.capacity || 0,
    insuranceExpiry: initialData?.insuranceExpiry || '',
    permitExpiry: initialData?.permitExpiry || '',
    fitnessExpiry: initialData?.fitnessExpiry || '',
    fuelType: initialData?.fuelType || '',
    averageMileage: initialData?.averageMileage || 0,
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
                name='vehicleNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Number</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter vehicle number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='vehicleType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Type</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter vehicle type' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='capacity'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='insuranceExpiry'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Insurance Expiry</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='permitExpiry'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Permit Expiry</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='fitnessExpiry'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fitness Expiry</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='fuelType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fuel Type</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter fuel type' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='averageMileage'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Average Mileage</FormLabel>
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
            <Button type='submit'>Add Vehicle</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}