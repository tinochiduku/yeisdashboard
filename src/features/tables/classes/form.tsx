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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { classes } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const formSchema = z.object({
  schoolId: z.string(),
  name: z.string(),
  level: z.coerce.number(),
  section: z.string(),
  capacity: z.coerce.number(),
  room: z.string(),
  isActive: z.boolean().default(true)
});

export default function ClassForm({
  id,
  initialData,
  pageTitle,
  edit
}: {
  id?: string
  initialData?: InferSelectModel<typeof classes> | null;
  pageTitle: string;
  edit?: boolean
}) {
  const [schools, setSchools] = useState([])
  const [loading, setLoading] = useState(false)

  const defaultValues = {
    schoolId: initialData?.schoolId || '',
    name: initialData?.name || '',
    level: initialData?.level || 0,
    section: initialData?.section || '',
    capacity: initialData?.capacity || 0,
    room: initialData?.room || '',
    isActive: initialData?.isActive || true
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const url = edit && id ? `/api/classes/${id}` : '/api/classes';
    const method = edit && id ? 'PUT' : 'POST';
    const payload = edit && id ? { ...values, id } : values;

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        setLoading(false);
        if (!res.ok) {
          const error = await res.text();
          toast.error(`Failed to ${edit ? 'update' : 'create'} class: ${error}`);
          return;
        }
        toast.success(`Class ${edit ? 'updated' : 'created'} successfully`);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(`Error: ${err.message}`);
      });
  }

  
  useEffect(() => {

    const fetchSchools = async () => {
      const res = await fetch(`/api/schools`, { cache: 'no-store' });
      if (!res.ok) {
        toast.error('Failed to Fetch Schools')
      }
      return res.json();
    }

    let sub = false

    if (!sub) {
      (async function() {
          const data = await fetchSchools()
          setSchools(data)
      })()
    }

    return () => { sub = true}
  }, [])

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
                name='schoolId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select School</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={`${edit && id ? field.value :  'Select School'}`} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                              schools.map(({id, name}) =>
                                <SelectItem key={id} value={id}>{name}</SelectItem>
                              )
                            }
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter class name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='level'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='section'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter section' {...field} />
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
                name='room'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter room' {...field} />
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
            <Button disabled={loading} type='submit'>{edit ? 'Edit Class' : 'Add Class'}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}