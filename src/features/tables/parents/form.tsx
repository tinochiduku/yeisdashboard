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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { parents } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { getData, postData, putData } from '@/utils/requests/dataQuery';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Combobox } from '@/components/ui/combobox';

const formSchema = z.object({
  userId: z.string().uuid(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  phone: z.string().optional(),
  alternatePhone: z.string().optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  occupation: z.string().optional(),
  workAddress: z.string().optional(),
  annualIncome: z.string().optional(),
  education: z.string().optional(),
  address: z.string().optional(),
  nationalId: z.string().optional(),
  photo: z.string().optional(),
  isEmergencyContact: z.boolean().default(false),
  isPrimaryContact: z.boolean().default(false),
});

export default function ParentForm({
  id,
  edit,
  initialData,
  pageTitle
}: {
  id?: string
  edit?: boolean
  initialData?: InferSelectModel<typeof parents> | null;
  pageTitle: string;
}) {
  const [users, setUsers ] = useState([])
  const [loading, setLoading] = useState(false)

  const defaultValues = {
    userId: initialData?.userId || '',
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    relationship: initialData?.relationship || '',
    phone: initialData?.phone || '',
    alternatePhone: initialData?.alternatePhone || '',
    email: initialData?.email || '',
    occupation: initialData?.occupation || '',
    workAddress: initialData?.workAddress || '',
    annualIncome: initialData?.annualIncome?.toString() || '',
    education: initialData?.education || '',
    address: initialData?.address || '',
    nationalId: initialData?.nationalId || '',
    photo: initialData?.photo || '',
    isEmergencyContact: initialData?.isEmergencyContact || false,
    isPrimaryContact: initialData?.isPrimaryContact || false,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
        const url = edit && id ? `/api/parents/${id}` : '/api/parents';
        const payload = edit && id ? { ...values, id } : values;
    
        try {
          setLoading(true)
    
          if (edit && id) {
            await putData({title: 'Edit Parent', url, values: payload})
          }
  
          if (!edit) {
            await postData({title: 'Add Parent', url, values: payload})
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
    
                  const _f_users = _users.filter(({isPending}: any) => isPending === false)
                  const users_data = _f_users.map((user:any) => ({ value: user.userId, label: user.email}))
      
                  setUsers(users_data);
    
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
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Account</FormLabel>
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
              {/* Basic Information */}
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
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
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter last name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='relationship'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship *</FormLabel>
                    <FormControl>
                      <Input placeholder='Father, Mother, Guardian' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='nationalId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>National ID</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter national ID' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contact Information */}
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter phone number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='alternatePhone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alternate Phone</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter alternate phone' {...field} />
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
                      <Input placeholder='Enter email address' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Professional Information */}
              <FormField
                control={form.control}
                name='occupation'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter occupation' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='education'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter education level' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='annualIncome'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Income</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter annual income' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address Information */}
              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem className='md:col-span-2'>
                    <FormLabel>Home Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Enter home address' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='workAddress'
                render={({ field }) => (
                  <FormItem className='md:col-span-2'>
                    <FormLabel>Work Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Enter work address' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Photo URL */}
              <FormField
                control={form.control}
                name='photo'
                render={({ field }) => (
                  <FormItem className='md:col-span-2'>
                    <FormLabel>Photo URL</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter photo URL' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contact Preferences */}
              <FormField
                control={form.control}
                name='isEmergencyContact'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Emergency Contact</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isPrimaryContact'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Primary Contact</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={loading} type='submit'>
              {edit ? 'Update Parent' : 'Add Parent'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}