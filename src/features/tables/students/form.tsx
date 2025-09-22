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
import { students, gender } from '@/db/schema';
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
import { Combobox } from '@/components/ui/combobox';
import { toast } from 'sonner';

const formSchema = z.object({
  userId: z.string().uuid(),
  schoolId: z.string().uuid(),
  classId: z.string().uuid(),
  admissionNumber: z.string().min(1, "Admission number is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  middleName: z.string().optional(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  gender: z.enum(gender.enumValues),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  nationality: z.string().optional(),
  religion: z.string().optional(),
  category: z.string().optional(),
  admissionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format").optional(),
  previousSchool: z.string().optional(),
  medicalInfo: z.record(z.any()).optional(), // or z.object({}).optional()
  specialNeeds: z.string().optional(),
  photo: z.string().optional(),
  documents: z.record(z.any()).optional(), // or z.object({}).optional()
  isActive: z.boolean().default(true)
});

export default function StudentForm({ 
  id,
  initialData,
  pageTitle,
  edit
}: { 
  id?: string;
  initialData?: InferSelectModel<typeof students> | null;
  pageTitle: string;
  edit?: boolean;
}) {

  const [ loading, setLoading ] = useState(false)
  const [ users, setUsers ] = useState([])
  const [ schools, setSchools ] =  useState([])
  const [ classes, setClasses ] =  useState([])

  const defaultValues = {
      userId: initialData?.userId || "",
      schoolId: initialData?.schoolId || "",
      classId: initialData?.classId || "",
      admissionNumber: initialData?.admissionNumber || "",
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      middleName: initialData?.middleName || "",
      dateOfBirth: initialData?.dateOfBirth || "",
      gender: initialData?.gender || "male",
      bloodGroup: initialData?.bloodGroup || "A+",
      address: initialData?.address || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "user@example.com",
      nationality: initialData?.nationality || "",
      religion: initialData?.religion || "",
      category: initialData?.category || "",
      admissionDate: initialData?.admissionDate || "2025-09-18",
      previousSchool: initialData?.previousSchool || "",
      medicalInfo: initialData?.medicalInfo || {},
      specialNeeds: initialData?.specialNeeds || "",
      photo: initialData?.photo || "",
      documents: initialData?.documents || {},
      isActive: initialData?.isActive || true
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const url = edit && id ? `/api/students/${id}` : '/api/students';
    const payload = edit && id ? { ...values, id } : values;

    try {
      setLoading(true)

      if (edit && id) {
        await putData({title: 'Edit Student', url, values: payload})
      }

      if (!edit) {
        await postData({title: 'Add Student', url, values: payload})
      }


    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
          try {

              const _users = await getData({ 
                title: 'Fetch Users', 
                url: `/api/users` 
              });

              const _schools = await getData({ 
                title: 'Fetch Schools', 
                url: `/api/schools` 
              });

              const _classes = await getData({ 
                title: 'Fetch Classes', 
                url: `/api/classes` 
              });

              const _f_users = _users.filter(({isPending}: any) => isPending === false)
              const users_data = _f_users.map((user:any) => ({ value: user.userId, label: user.email}))
              const schools_data = _schools.map((school:any) => ({ value: school.id, label: school.name}))
              const classes_data = _classes.map((_class:any) => ({ value: _class.id, label: _class.name}))
  
              setUsers(users_data);
              setSchools(schools_data);
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
                name='userId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student User</FormLabel>
                    <FormControl>
                      <Combobox
                        options={users}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select a user..."
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
                name='classId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class ID</FormLabel>
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
                name='admissionNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admission Number</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter admission number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter first name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter last name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='middleName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter middle name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='dateOfBirth'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select gender' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gender.enumValues.map((gender) => (
                          <SelectItem key={gender} value={gender}>
                            {gender}
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
                name='bloodGroup'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blood Group</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select blood group' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Input type='tel' placeholder='Enter phone number' {...field} />
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
                      <Input type='email' placeholder='Enter email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='nationality'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter nationality' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='religion'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Religion</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter religion' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter category' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='admissionDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admission Date</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='previousSchool'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Previous School</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter previous school' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='specialNeeds'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Needs</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter special needs' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='photo'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo URL</FormLabel>
                    <FormControl>
                      <Input type='url' placeholder='Enter photo URL' {...field} />
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
            <Button disabled={loading} type='submit'>{edit ? 'Edit Student' : 'Add Student'}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}