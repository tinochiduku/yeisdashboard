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
import { subjects } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useState } from 'react';
import { getData, postData, putData } from '@/utils/requests/dataQuery';
import { toast } from 'sonner';
import { Combobox } from '@/components/ui/combobox';

const formSchema = z.object({
  schoolId: z.string(),
  name: z.string(),
  description: z.string(),
  code: z.string(),
  credits: z.coerce.number(),
  isCore: z.boolean().default(false),
  isActive: z.boolean().default(true)
});

export default function SubjectForm({
  id, 
  edit,
  initialData,
  pageTitle
}: {
  id?: string 
  edit?: boolean
  initialData?: InferSelectModel<typeof subjects> | null;
  pageTitle: string;
}) {

  const [schools, setSchools ] = useState([])
  const [loading, setLoading ] = useState(false)

  const defaultValues = {
    schoolId: initialData?.schoolId || '',
    name: initialData?.name || '',
    description: initialData?.description || '',
    code: initialData?.code || '',
    credits: initialData?.credits || 0,
    isCore: initialData?.isCore || false,
    isActive: initialData?.isActive || true
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

   async function onSubmit(values: z.infer<typeof formSchema>) {
      const url = edit && id ? `/api/subjects/${id}` : '/api/subjects';
      const payload = edit && id ? { ...values, id } : values;
  
      try {
        setLoading(true)
  
        if (edit && id) {
          await putData({title: 'Edit Subject', url, values: payload})
        }
  
        if (!edit){
          await postData({title: 'Add Subject', url, values: payload})
        }
  
      } finally {
        setLoading(false)
      }
  
    }

    useEffect(() => {
      let isMounted = true;
      
      const fetchData = async () => {
            try {
  
                const _schools = await getData({ 
                  title: 'Fetch Schools', 
                  url: `/api/schools` 
                });
  
                const schools_data = _schools.map((school:any) => ({ value: school.id, label: school.name}))
    
                setSchools(schools_data);
  
            } catch (error) {
              toast.error(`Failed to fetch user data: ${error}`);
            }
  
      };
  
      if (isMounted) {
        fetchData();
      }
    
    
      return () => { 
        isMounted = false; 
      };
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
                    <FormLabel>School ID</FormLabel>
                    <FormControl>
                      <Combobox
                        options={schools}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select a school..."
                        className="w-full"
                        buttonClassName="bg-blue-50 border-blue-200"
                        contentClassName="max-h-[300px]"
                      />
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
                      <Input placeholder='Enter name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter desc...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter code' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='credits'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credits</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isCore'
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
                        Core
                      </FormLabel>
                    </div>
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
            <Button disabled={loading} type='submit'>{edit ? 'Edit Subject':'Add Subject'}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}