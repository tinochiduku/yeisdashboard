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
import { attendance, attendanceStatus } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { getData } from '@/utils/requests/dataQuery';
import { Combobox } from '@/components/ui/combobox';
import { toast } from 'sonner';

const formSchema = z.object({
  studentId: z.string().uuid(),
  classId: z.string().uuid(),
  subjectId: z.string().uuid(),
  teacherId: z.string().uuid(),
  date: z.string(),
  status: z.enum(attendanceStatus.enumValues),
  remarks: z.string().optional(),
  markedBy: z.string().uuid()
});

export default function AttendanceForm({
  id,
  initialData,
  pageTitle
}: {
  id: string
  initialData: InferSelectModel<typeof attendance> | null;
  pageTitle: string;
}) {

  const defaultValues = {
  studentId: initialData?.studentId || '',
  classId: initialData?.classId || '',
  subjectId: initialData?.subjectId || '',
  teacherId: initialData?.teacherId || '',
  date: new Date().toISOString().split('T')[0],
  status: initialData?.status || 'present',
  remarks: initialData?.remarks || '',
  markedBy: initialData?.markedBy || '' // You might want to set this to current user ID
};

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [classes, setClasses] = useState([])
  const [subjects, setSubjects] = useState([])
  const [teachers, setTeachers ] = useState([])

  const edit = id ? true : false

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    //@ts-ignore
    defaultValues
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const method = edit ? 'PUT' : 'POST'
    const url = edit ? `/api/attendances/${initialData?.id}` : '/api/attendances'
    const payload = edit ? 
      { ...values, id, markedBy: values.teacherId } 
    : { ...values, markedBy: values.teacherId }


    try {
      setIsSubmitting(true);
      
      // Add your API call here
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Submission failed');
      
      toast.success('Submission successful')
      
    } catch (error) {
      toast.error('Submission error')
    } finally {
      setIsSubmitting(false);
    }
  }

useEffect(() => {
  let isMounted = true;

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [classesData, teachersData, subjectsData] = await Promise.all([
        getData({ title: 'Fetch Classes', url: '/api/classes' }),
        getData({ title: 'Fetch Teachers', url: '/api/teachers' }),
        getData({ title: 'Fetch Subjects', url: '/api/subjects' })
      ]);

      if (isMounted) {
        setClasses(classesData.map((item: any) => ({ label: item.name, value: item.id })));
        setTeachers(teachersData.map((item: any) => ({ label: item.name, value: item.userId })));
        setSubjects(subjectsData.map((item: any) => ({ label: item.name, value: item.id })));
      }
    } catch (err) {
      if (isMounted) {
        setError('Failed to load form data');
        console.error('Error fetching data:', err);
      }
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  fetchData();

  return () => { isMounted = false };
}, []);

  return (
    <Card className='mx-auto w-full shadow-none border-none'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='flex flex-col gap-4'>
              

              <FormField
                control={form.control}
                name='classId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <FormControl>
                      <Combobox
                        options={classes}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select a class..."
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
                name='subjectId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Combobox
                        options={subjects}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select a subject..."
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
                name='teacherId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teacher</FormLabel>
                    <FormControl>
                      <Combobox
                        options={teachers}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select a teacher..."
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
                name='date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select status' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {attendanceStatus.enumValues.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
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
                name='remarks'
                render={({ field }) => (
                  <FormItem className="md:col-span-2 lg:col-span-3">
                    <FormLabel>Remarks</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Add any remarks...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
            <Button onClick={() => onSubmit(form.getValues())} disabled={loading || isSubmitting} className='w-full' type='submit'>{edit ? 'Save Changes' : 'Submit Record'}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}