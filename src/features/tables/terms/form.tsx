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
import { terms, termType } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { getData, postData, putData } from '@/utils/requests/dataQuery';
import { toast } from 'sonner';
import { Combobox } from '@/components/ui/combobox';

const formSchema = z.object({
  academicYearId: z.string(),
  name: z.string(),
  type: z.enum(termType.enumValues),
  startDate: z.string(),
  endDate: z.string(),
  isActive: z.boolean().default(false)
});

export default function TermForm({
  id, 
  edit,
  initialData,
  pageTitle
}: {
  id?: string 
  edit?: boolean
  initialData?: InferSelectModel<typeof terms> | null;
  pageTitle: string;
}) {

  const [loading, setLoading] = useState(false)
  const [academicYears, setAcademicYears] = useState([])

  const defaultValues = {
    academicYearId: initialData?.academicYearId || '',
    name: initialData?.name || '',
    type: initialData?.type || 'first',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    isActive: initialData?.isActive || false
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    //@ts-ignore
    values: defaultValues
  });

       async function onSubmit(values: z.infer<typeof formSchema>) {
        const url = edit && id ? `/api/terms/${id}` : '/api/terms';
        const payload = edit && id ? { ...values, id } : values;
    
        try {
          setLoading(true)
    
          if (edit && id) {
            await putData({title: 'Edit Term', url, values: payload})
          }
    
          if (!edit) {
            await postData({title: 'Add Term', url, values: payload})
          }
    
        } finally {
          setLoading(false)
        }
    
      }
  
      useEffect(() => {
        let isMounted = true;
        
        const fetchData = async () => {
              try {
    
                  const _years = await getData({ 
                    title: 'Fetch Academic Years', 
                    url: `/api/academic-years` 
                  });
    
                  const years_data = _years.map((year:any) => ({ value: year.id, label: year.name}))
      
                  setAcademicYears(years_data);
    
              } catch (error) {
                toast.error(`Failed to fetch academic year data: ${error}`);
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
                name='academicYearId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Academic Year</FormLabel>
                    <FormControl>
                      <Combobox
                        options={academicYears}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select Academic Year."
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
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {termType.enumValues.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
            <Button disabled={loading} type='submit'>{edit ? 'Edit':'Add'} Term</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}