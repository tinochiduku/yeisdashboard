'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { students, gender } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { useEffect, useState } from 'react';
import { getData, postData, putData } from '@/utils/requests/dataQuery';
import { FieldConfig } from '@/types/field-config';

import { toast } from 'sonner';
import { FieldGenerator } from '@/utils/requests/form-generator';
import { useApiData } from '@/hooks/use-apidata';

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
  const { data, isLoading, error } = useApiData({
  endpoints: ['users', 'schools', 'classes']
});

  const _f_users = (data.users ?? []).filter(({isPending}: any) => isPending === false)
  const users = _f_users.map((user:any) => ({ value: user.userId, label: user.email}))
  const schools = (data.schools ?? []).map((school:any) => ({ value: school.id, label: school.name}))
  const classes = (data.classes ?? []).map((_class:any) => ({ value: _class.id, label: _class.name}))

  const studentFormConfig: FieldConfig[] = [
    {
      name: 'userId',
      label: 'User',
      type: 'combobox',
      placeholder: 'Select user',
      options: users,
      required: true,
      colSpan: 1
    },
    {
      name: 'schoolId',
      label: 'School',
      type: 'combobox',
      placeholder: 'Select school',
      options: schools,
      required: true,
      colSpan: 1
    },
    {
      name: 'classId',
      label: 'Class',
      type: 'combobox',
      placeholder: 'Select class',
      options: classes,
      required: true,
      colSpan: 1
    },
    {
      name: 'admissionNumber',
      label: 'Admission Number',
      type: 'input',
      placeholder: 'Enter admission number',
      required: true,
      colSpan: 1
    },
    {
      name: 'firstName',
      label: 'First Name',
      type: 'input',
      placeholder: 'Enter first name',
      required: true,
      colSpan: 1
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'input',
      placeholder: 'Enter last name',
      required: true,
      colSpan: 1
    },
    {
      name: 'middleName',
      label: 'Middle Name',
      type: 'input',
      placeholder: 'Enter middle name',
      colSpan: 1
    },
    {
      name: 'dateOfBirth',
      label: 'Date of Birth',
      type: 'date',
      placeholder: 'YYYY-MM-DD',
      required: true,
      colSpan: 1
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      placeholder: 'Select gender',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' }
      ],
      required: true,
      colSpan: 1
    },
    {
      name: 'bloodGroup',
      label: 'Blood Group',
      type: 'select',
      placeholder: 'Select blood group',
      options: [
        { label: 'A+', value: 'A+' },
        { label: 'A-', value: 'A-' },
        { label: 'B+', value: 'B+' },
        { label: 'B-', value: 'B-' },
        { label: 'AB+', value: 'AB+' },
        { label: 'AB-', value: 'AB-' },
        { label: 'O+', value: 'O+' },
        { label: 'O-', value: 'O-' }
      ],
      colSpan: 1
    },
    {
      name: 'address',
      label: 'Address',
      type: 'textarea',
      placeholder: 'Enter address',
      colSpan: 2
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'input',
      placeholder: 'Enter phone number',
      colSpan: 1
    },
    {
      name: 'email',
      label: 'Email',
      type: 'input',
      placeholder: 'Enter email address',
      colSpan: 1
    },
    {
      name: 'nationality',
      label: 'Nationality',
      type: 'input',
      placeholder: 'Enter nationality',
      colSpan: 1
    },
    {
      name: 'religion',
      label: 'Religion',
      type: 'input',
      placeholder: 'Enter religion',
      colSpan: 1
    },
    {
      name: 'category',
      label: 'Category',
      type: 'input',
      placeholder: 'Enter category',
      colSpan: 1
    },
    {
      name: 'admissionDate',
      label: 'Admission Date',
      type: 'date',
      placeholder: 'YYYY-MM-DD',
      colSpan: 1
    },
    {
      name: 'previousSchool',
      label: 'Previous School',
      type: 'input',
      placeholder: 'Enter previous school',
      colSpan: 1
    },
    {
      name: 'specialNeeds',
      label: 'Special Needs',
      type: 'textarea',
      placeholder: 'Enter special needs',
      colSpan: 2
    },
    {
      name: 'isActive',
      label: 'Active Student',
      type: 'checkbox',
      colSpan: 2
    }
  ];

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
              {studentFormConfig.map((config) => (
                  <FieldGenerator
                    key={config.name}
                    config={config}
                    form={form}
                  />
                ))}
            </div>
            <Button disabled={loading} type='submit'>{edit ? 'Edit Student' : 'Add Student'}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}