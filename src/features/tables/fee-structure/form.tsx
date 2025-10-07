'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as z from 'zod';
import { feeStructure, feeType } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { useState } from 'react';
import DynamicForm from '@/components/form/dynamic-form';
import { FieldConfig } from '@/components/form/field-config';
import { useApiData } from '@/hooks/use-apidata';

const formSchema = z.object({
  schoolId: z.string().uuid("Invalid school ID").min(1, "School is required"),
  classId: z.string().uuid("Invalid class ID").min(1, "Class is required"),
  academicYearId: z.string().uuid("Invalid academic year ID").min(1, "Academic year is required"),
  feeType: z.enum(feeType.enumValues, {
    required_error: "Fee type is required",
  }),
  name: z.string().min(1, "Name is required").max(255, "Name must be less than 255 characters"),
  amount: z.coerce.number().min(0.01, "Amount must be greater than 0"),
  dueDate: z.string().min(1, "Due date is required"),
  isOptional: z.boolean().default(false),
  description: z.string().optional(),
  isActive: z.boolean().default(true)
});
export default function FeeStructureForm({
  id,
  edit,
  initialData,
  pageTitle
}: {
  id?: string
  edit?: boolean
  initialData?: InferSelectModel<typeof feeStructure> | null;
  pageTitle: string;
}) {

  const { data, isLoading, error} = useApiData({
    endpoints: ['schools', 'academicYears', 'classes']
  })

  const schools = (data.schools ?? []).map((item) => ({label: item.name, value: item.id}))
  const classes = (data.classes ?? []).map((item) => ({label: item.name, value: item.id}))
  const years = (data.academicYears ?? []).map((item) => ({label: item.name, value: item.id}))

  const feeStructureConfig: FieldConfig[] = [
    {
      name: 'schoolId',
      label: 'School',
      type: 'combobox',
      options: schools,
      placeholder: 'Enter School',
      required: true,
      colSpan: 1
    },
    {
      name: 'classId',
      label: 'Class',
      type: 'combobox',
      options: classes,
      placeholder: 'Select Class',
      required: true,
      colSpan: 1
    },
    {
      name: 'academicYearId',
      label: 'Academic Year',
      type: 'combobox',
      options: years,
      placeholder: 'Enter Academic Year',
      required: true,
      colSpan: 1
    },
    {
      name: 'name',
      label: 'Fee Name',
      type: 'input',
      placeholder: 'Enter fee name',
      required: true,
      colSpan: 1
    },
    {
      name: 'feeType',
      label: 'Fee Type',
      type: 'select',
      required: true,
      options: [
        { label: 'Tuition', value: 'tuition' },
        { label: 'Hostel', value: 'hostel' },
        { label: 'Transport', value: 'transport' },
        { label: 'Activity', value: 'activity' },
        { label: 'Exam', value: 'exam' },
        { label: 'Library', value: 'library' },
        { label: 'Lab', value: 'lab' },
        { label: 'Other', value: 'other' }
      ],
      colSpan: 1
    },
    {
      name: 'amount',
      label: 'Amount',
      type: 'input',
      placeholder: 'Enter fee amount',
      required: true,
      colSpan: 1
    },
    {
      name: 'dueDate',
      label: 'Due Date',
      type: 'date',
      colSpan: 1
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Enter fee description',
      colSpan: 2
    },
    {
      name: 'isOptional',
      label: 'Optional Fee',
      type: 'checkbox',
      colSpan: 1
    },
    {
      name: 'isActive',
      label: 'Active Status',
      type: 'checkbox',
      colSpan: 1
    }
  ];
  
  const defaultValues = {
    schoolId: initialData?.schoolId || '',
    classId: initialData?.classId || '',
    academicYearId: initialData?.academicYearId || '',
    feeType: initialData?.feeType || feeType.enumValues[0],
    name: initialData?.name || '',
    amount: initialData?.amount ? parseFloat(initialData.amount) : 0,
    dueDate: initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '',
    isOptional: initialData?.isOptional || false,
    description: initialData?.description || '',
    isActive: initialData?.isActive ?? true // Default to true if not provided
  };


  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DynamicForm
          id={id}
          edit={edit}
          defaultValues={defaultValues}
          formConfig={feeStructureConfig}
          pageTitle={pageTitle}
          apiBasePath='/api/fee-structures'
          formSchema={formSchema}
        />
      </CardContent>
    </Card>
  );
}