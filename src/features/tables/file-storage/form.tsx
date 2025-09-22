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
import { fileStorage } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  fileName: z.string(),
  fileSize: z.coerce.number(),
  mimeType: z.string(),
  isPublic: z.boolean().default(false)
});

export default function FileStorageForm({
  initialData,
  pageTitle
}: {
  initialData: InferSelectModel<typeof fileStorage> | null;
  pageTitle: string;
}) {
  const defaultValues = {
    fileName: initialData?.fileName || '',
    fileSize: initialData?.fileSize || 0,
    mimeType: initialData?.mimeType || '',
    isPublic: initialData?.isPublic || false
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
                name='fileName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter file name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='fileSize'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File Size</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='mimeType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>MIME Type</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter MIME type' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isPublic'
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
                        Public
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit'>Add File</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}