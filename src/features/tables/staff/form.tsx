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
import { bloodGroup, gender, maritalStatus, staff, staffType } from '@/db/schema';
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
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  userId: z.string(),
  schoolId: z.string(),
  employeeId: z.string().min(1, "Employee ID is required"),
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  middleName: z.string().max(100).optional().or(z.literal('')),
  dateOfBirth: z.date().optional().nullable(),
  gender: z.enum(gender.enumValues).optional(),
  phone: z.string().max(20).optional().or(z.literal('')),
  alternatePhone: z.string().max(20).optional().or(z.literal('')),
  email: z.string().email().max(255).optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  nationalId: z.string().max(50).optional().or(z.literal('')),
  bloodGroup: z.enum(bloodGroup.enumValues).optional(),
  maritalStatus: z.enum(maritalStatus.enumValues).optional(),
  emergencyContact: z.any().optional(),
  qualification: z.any().optional(),
  experience: z.any().optional(),
  staffType: z.enum(staffType.enumValues),
  department: z.string().max(100).optional().or(z.literal('')),
  designation: z.string().max(100).optional().or(z.literal('')),
  joiningDate: z.date(),
  leavingDate: z.date().optional().nullable(),
  salary: z.string().optional().or(z.literal('')),
  bankDetails: z.any().optional(),
  documents: z.any().optional(),
  photo: z.string().max(500).optional().or(z.literal('')),
  isActive: z.boolean().default(true)
});

export default function StaffForm({
  id,
  edit,
  initialData,
  pageTitle
}: {
  id?: string
  edit?: boolean
  initialData?: InferSelectModel<typeof staff> | null;
  pageTitle: string;
}) {

  const [loading, setLoading] = useState(false)
  const [ users, setUsers ] = useState([])
  const [ schools, setSchools ] =  useState([])

  const defaultValues = {
    userId: initialData?.userId || '',
    schoolId: initialData?.schoolId || '',
    employeeId: initialData?.employeeId || '',
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    middleName: initialData?.middleName || '',
    dateOfBirth: initialData?.dateOfBirth ? new Date(initialData.dateOfBirth) : null,
    gender: initialData?.gender || undefined,
    phone: initialData?.phone || '',
    alternatePhone: initialData?.alternatePhone || '',
    email: initialData?.email || '',
    address: initialData?.address || '',
    nationalId: initialData?.nationalId || '',
    bloodGroup: initialData?.bloodGroup || undefined,
    maritalStatus: initialData?.maritalStatus || undefined,
    emergencyContact: initialData?.emergencyContact || null,
    qualification: initialData?.qualification || null,
    experience: initialData?.experience || null,
    staffType: initialData?.staffType || 'teaching',
    department: initialData?.department || '',
    designation: initialData?.designation || '',
    joiningDate: initialData?.joiningDate ? new Date(initialData.joiningDate) : new Date(),
    leavingDate: initialData?.leavingDate ? new Date(initialData.leavingDate) : null,
    salary: initialData?.salary?.toString() || '',
    bankDetails: initialData?.bankDetails || null,
    documents: initialData?.documents || null,
    photo: initialData?.photo || '',
    isActive: initialData?.isActive ?? true
  };
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    //@ts-ignore
    defaultValues
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
      const url = edit && id ? `/api/staff/${id}` : '/api/staff';
      const payload = edit && id ? { ...values, id } : values;
  
      try {
        setLoading(true)
  
        if (edit && id) {
          await putData({title: 'Edit Staff', url, values: payload})
        }

        if (!edit) {
          await postData({title: 'Add Staff', url, values: payload})
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
  
                const _f_users = _users.filter(({isPending}: any) => isPending === false)
                const users_data = _f_users.map((user:any) => ({ value: user.userId, label: user.email}))
                const schools_data = _schools.map((school:any) => ({ value: school.id, label: school.name}))
    
                setUsers(users_data);
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* User and School Selection */}
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Staff User</FormLabel>
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
                name="schoolId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School</FormLabel>
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

              {/* Basic Information */}
              <FormField
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee ID *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter employee ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter middle name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Personal Details */}
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={field.value ? field.value.toISOString().split('T')[0] : ''}
                        onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gender.enumValues.map((type) => (
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alternatePhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alternate Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter alternate phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Identification */}
              <FormField
                control={form.control}
                name="nationalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>National ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter national ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bloodGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blood Group</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bloodGroup.enumValues.map((type) => (
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
                name="maritalStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marital Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder="Select marital status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {maritalStatus.enumValues.map((type) => (
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

              {/* Employment Details */}
              <FormField
                control={form.control}
                name="staffType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Staff Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder="Select staff type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {staffType.enumValues.map((type) => (
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
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter department" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter designation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="joiningDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Joining Date *</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={field.value.toISOString().split('T')[0]}
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="leavingDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Leaving Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={field.value ? field.value.toISOString().split('T')[0] : ''}
                        onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="Enter salary" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* JSON Fields (You might want to create custom components for these) */}
              <FormField
                control={form.control}
                name="emergencyContact"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Emergency Contact</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter emergency contact as JSON: {"name": "", "relationship": "", "phone": ""}'
                        value={field.value ? JSON.stringify(field.value, null, 2) : ''}
                        onChange={(e) => {
                          try {
                            field.onChange(e.target.value ? JSON.parse(e.target.value) : null);
                          } catch (error) {
                            // Handle JSON parse error
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="qualification"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Qualification</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter qualification as JSON array'
                        value={field.value ? JSON.stringify(field.value, null, 2) : ''}
                        onChange={(e) => {
                          try {
                            field.onChange(e.target.value ? JSON.parse(e.target.value) : null);
                          } catch (error) {
                            // Handle JSON parse error
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Experience</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter experience as JSON array'
                        value={field.value ? JSON.stringify(field.value, null, 2) : ''}
                        onChange={(e) => {
                          try {
                            field.onChange(e.target.value ? JSON.parse(e.target.value) : null);
                          } catch (error) {
                            // Handle JSON parse error
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bankDetails"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Bank Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter bank details as JSON'
                        value={field.value ? JSON.stringify(field.value, null, 2) : ''}
                        onChange={(e) => {
                          try {
                            field.onChange(e.target.value ? JSON.parse(e.target.value) : null);
                          } catch (error) {
                            // Handle JSON parse error
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Documents and Photo */}
              <FormField
                control={form.control}
                name="documents"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Documents</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter document URLs as JSON array'
                        value={field.value ? JSON.stringify(field.value, null, 2) : ''}
                        onChange={(e) => {
                          try {
                            field.onChange(e.target.value ? JSON.parse(e.target.value) : null);
                          } catch (error) {
                            // Handle JSON parse error
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter photo URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 md:col-span-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Active</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={loading} type='submit'>{edit ? 'Edit Staff' : 'Add Staff'}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}