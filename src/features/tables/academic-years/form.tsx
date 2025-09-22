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
import { academicYears } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useState } from 'react';
import { getData, postData, putData } from '@/utils/requests/dataQuery';
import { Combobox } from '@/components/ui/combobox';
import { toast } from 'sonner';

const formSchema = z.object({
  schoolId: z.string(),
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  startDate: z.string(),
  endDate: z.string(),
  isActive: z.boolean().default(false)
});

export default function AcademicYearForm({
  id,
  edit,
  initialData,
  pageTitle
}: {
  id?: string 
  edit?: boolean
  initialData?: InferSelectModel<typeof academicYears> | null;
  pageTitle: string;
}) {

  const [schools, setSchools] = useState([])
  const [loading, setLoading ] = useState(false)

  const defaultValues = {
    schoolId: initialData?.schoolId || '',
    name: initialData?.name || '',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    isActive: initialData?.isActive || false
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

     async function onSubmit(values: z.infer<typeof formSchema>) {
      const url = edit && id ? `/api/academic-years/${id}` : '/api/academic-years';
      const payload = edit && id ? { ...values, id } : values;
  
      try {
        setLoading(true)
  
        if (edit && id) {
          await putData({title: 'Edit Year', url, values: payload})
        }

        if(!edit) {
          await postData({title: 'Add Year', url, values: payload})
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
                      <Input placeholder='Enter academic year name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='startDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='endDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
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
            <Button disabled={loading} type='submit'>{edit ? 'Edit':'Add'} Academic Year</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}