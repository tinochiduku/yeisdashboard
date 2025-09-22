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
import { schools } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string().email(),
  website: z.string(),
  logo: z.string(),
  establishedYear: z.coerce.string(),
  motto: z.string(),
  principalName: z.string(),
  registrationNumber: z.string(),
  isActive: z.boolean().default(true),
  settings: z.object({})
});

export default function SchoolForm({
  edit,
  initialData,
  pageTitle,
  id
}: {
  initialData?: InferSelectModel<typeof schools> | null;
  pageTitle: string;
  edit?: boolean;
  id?: string;
}) {
  const defaultValues = {
    name: initialData?.name || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    address: initialData?.address || '',
    website: initialData?.website || '',
    logo: initialData?.logo || '',
    establishedYear: initialData?.establishedYear || '',
    motto: initialData?.motto || '',
    principalName: initialData?.principalName || '',
    registrationNumber: initialData?.registrationNumber || '',
    isActive: initialData?.isActive || true,
    settings: initialData?.settings || {},
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
      setLoading(true);
      try {
        if (edit && id) {
          const res = await fetch(`/api/schools/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...values, id }),
          });

          if(res.ok) {
            toast.success('Edit Successfull')
          }
          // handle response if needed
        }
        
        if (!edit ) {
          const res = await fetch('/api/schools', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          });

          if(res.ok) {
            toast.success('School Added')
          }
          // handle response if needed
        }
      } catch (error){
        toast.error('Something Went Wrong')
      }
      finally {
        setLoading(false);
      }
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
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter address' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter phone' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='website'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter website url' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='logo'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo Url</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter logo url' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='establishedYear'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year Established</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Year' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='motto'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Motto</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Motto' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='principalName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Principal Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Principal Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='registrationNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Number</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Registration Number' {...field} />
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
            <Button disabled={loading} type='submit'>{ edit ? 'Edit School' : 'Add School'}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}