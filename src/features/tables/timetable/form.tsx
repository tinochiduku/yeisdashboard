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
import { timetable, dayOfWeek } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Combobox } from '@/components/ui/combobox';
import { useEffect, useState } from 'react';
import { getData, postData, putData } from '@/utils/requests/dataQuery';
import { toast } from 'sonner';

const formSchema = z.object({
  classId: z.string(),
  subjectId: z.string(),
  teacherId: z.string(),
  dayOfWeek: z.enum(dayOfWeek.enumValues),
  startTime: z.string(),
  endTime: z.string(),
  room: z.string(),
  isActive: z.boolean().default(true)
});

export default function TimetableForm({
  id,
  edit,
  initialData,
  pageTitle
}: {
  id?: string 
  edit?: boolean
  initialData?: InferSelectModel<typeof timetable> | null;
  pageTitle: string;
}) {

  const [loading, setLoading] = useState(false)
  const [classes, setClasses] = useState([])
  const [subjects , setSubjects] = useState([])
  const [teachers, setTeachers] = useState([])
  
  const defaultValues = {
    classId: initialData?.classId || '',
    subjectId: initialData?.subjectId || '',
    teacherId: initialData?.teacherId || '',
    dayOfWeek: initialData?.dayOfWeek || 'monday',
    startTime: initialData?.startTime || '',
    endTime: initialData?.endTime || '',
    room: initialData?.room || '',
    isActive: initialData?.isActive || true
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const url = edit && id ? `/api/timetables/${id}` : '/api/timetables';
    const payload = edit && id ? { ...values, id } : values;

    try {
      setLoading(true)

      if (edit && id) {
        await putData({title: 'Edit Entry', url, values: payload})
      }

      if (!edit) {
        await postData({title: 'Add Entry', url, values: payload})
      }

    } finally {
      setLoading(false)
    }

  }

    useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
          try {

              const _subjects = await getData({ 
                title: 'Fetch Subjects', 
                url: `/api/subjects` 
              });

              const _teachers = await getData({ 
                title: 'Fetch Teachers', 
                url: `/api/staff` 
              });

              const _classes = await getData({ 
                title: 'Fetch Classes', 
                url: `/api/classes` 
              });

              
              const filter_teachers = _teachers.filter(({ staffType }: any) => staffType === 'teaching')

              const subjects_data = _subjects.map((subject:any) => ({ value: subject.id, label: subject.name}))
              const teachers_data = filter_teachers.map((teacher:any) => ({ value: teacher.id, label: `${teacher.firstName} ${teacher.lastName}`}))
              const classes_data = _classes.map((_class:any) => ({ value: _class.id, label: _class.name}))
  
              setSubjects(subjects_data);
              setTeachers(teachers_data);
              setClasses(classes_data);

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
                name='dayOfWeek'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day of the Week</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select a day' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {dayOfWeek.enumValues.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
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
                name='startTime'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input type='time' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='endTime'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input type='time' {...field} />
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
            <Button disabled={loading} type='submit'>{edit ? 'Edit Timetable Entry' : 'Add Timetable Entry'}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}