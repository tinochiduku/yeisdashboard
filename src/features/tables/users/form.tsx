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
import { users, userRole } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useState } from 'react';
import { toast } from 'sonner';
import { getData } from '@/utils/requests/dataQuery';
import { error } from 'console';

const formSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  passwordHash: z.string(),
  role: z.enum(userRole.enumValues),
  isActive: z.boolean().default(true),
  emailVerified: z.boolean().default(true),
  twoFactorEnabled: z.boolean().default(true),
});

export default function UserForm({
  id,
  initialData,
  pageTitle,
  edit
}: {
  id?: string
  initialData?: InferSelectModel<typeof users> | null;
  pageTitle: string;
  edit?: boolean
}) {
  const defaultValues = {
    id: initialData?.id || '',
    email: initialData?.email || '',
    passwordHash: initialData?.passwordHash || '',
    role: initialData?.role || '',
    isActive: initialData?.isActive || false,
    emailVerified: initialData?.emailVerified || true,
    twoFactorEnabled: initialData?.twoFactorEnabled || false,
  };

  const  [ loading, setLoading ] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  const isUserAlreadyAdded = async (id: string | undefined) => {
  try {
    const res = await fetch(`/api/users/${id}`);
    
    if (res.ok) {
      return true; // User exists
    } else if (res.status === 404) {
      return false; // User doesn't exist 
    } else {
      toast.error(`Server error: ${res.status}`);
      return false;
    }
  } catch (error) {
    toast.error(`Something went wrong: ${error}`);
    return false;
  }
};

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    setLoading(true);
    const userExists = await isUserAlreadyAdded(id)
    const clerk_user = fetch(`/api/users`)
      .then((response) => response.json())
      .then((users) => users.filter((user: any) => user.id === id))
      .catch((error) => { toast.error(`${error}`)})
       
    const clerkAccount = await clerk_user
    const isClerkAccount = clerkAccount.length !== 0


    /**
     * /api/users --> this route searches for id's without the uuid constraint for clerk users
     * /api/users/uuid --> this one has uuid constraints || this is for accounts that are not connected with clerk
     */

    const url = isClerkAccount ? `/api/users/${id}` : `/api/users/uuid/${id}`;
    const method = isClerkAccount && userExists ? 'PUT' : 'POST';
    const payload = isClerkAccount ? { ...values, id } : values;

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        setLoading(false);
        if (!res.ok) {
          const error = await res.statusText;
          console.error(res)
          toast.error(`Failed to ${edit ? 'update' : 'create'} user: ${error}`);
          return;
        }
        toast.success(`User ${edit ? 'updated' : 'created'} successfully`);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(`Error: ${err.message}`);
      });
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
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='passwordHash'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select a role' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='w-full'>
                        {userRole.enumValues.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
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
              <FormField
                control={form.control}
                name='emailVerified'
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
                        Email Verified
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='twoFactorEnabled'
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
                        Two Factor Authentication
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={loading} type='submit'>{edit ? 'Edit User' : 'Add User'}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}