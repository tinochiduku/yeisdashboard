'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as z from 'zod';
import { exams, examType } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { FieldConfig } from '@/components/form/field-config';
import { useApiData } from '@/hooks/use-apidata';
import DynamicForm from '@/components/form/dynamic-form';

const formSchema = z.object({
  schoolId: z.string().uuid(),
  academicYearId: z.string().uuid(),
  termId: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  type: z.enum(examType.enumValues),
  maxMarks: z.coerce.number(),
  passMarks: z.coerce.number(),
  startDate: z.string(),
  endDate: z.string(),
  isActive: z.boolean().default(true)
});

export default function ExamForm({
  id,
  edit,
  initialData,
  pageTitle
}: {
  id?: string
  edit?: boolean
  initialData?: InferSelectModel<typeof exams> | null;
  pageTitle: string;
}) {

  const { data, isLoading, error } = useApiData({
    endpoints: ['terms', 'schools', 'academicYears']
  });
  
    const schools = (data.schools ?? []).map((item:any) => ({ value: item.id, label: item.name}))
    const terms = (data.terms ?? []).map((item:any) => ({ value: item.id, label: item.name}))
    const academicYears = (data.academicYears ?? []).map((item:any) => ({ value: item.id, label: item.name}))

    const examConfig: FieldConfig[] = [
        {
          name: 'schoolId',
          label: 'School ID',
          type: 'combobox',
          options: schools,
          placeholder: 'Select School',
          required: true,
          colSpan: 1
        },
        {
          name: 'academicYearId',
          label: 'Academic Year',
          type: 'combobox',
          options: academicYears,
          placeholder: 'Select Academic Year',
          required: true,
          colSpan: 1
        },
        {
          name: 'termId',
          label: 'Term',
          type: 'combobox',
          options: terms,
          placeholder: 'Select Term',
          required: true,
          colSpan: 1
        },
        {
          name: 'name',
          label: 'Exam Name',
          type: 'input',
          placeholder: 'Enter exam name',
          required: true,
          colSpan: 1
        },
        {
          name: 'type',
          label: 'Exam Type',
          type: 'select',
          required: true,
          options: [
            { label: 'Quiz', value: 'quiz' },
            { label: 'Test', value: 'test' },
            { label: 'Midterm', value: 'midterm' },
            { label: 'Final', value: 'final' },
            { label: 'Assignment', value: 'assignment' },
            { label: 'Project', value: 'project' }
          ],
          colSpan: 1
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Enter exam description',
          colSpan: 2
        },
        {
          name: 'startDate',
          label: 'Start Date',
          type: 'date',
          required: true,
          colSpan: 1
        },
        {
          name: 'endDate',
          label: 'End Date',
          type: 'date',
          required: true,
          colSpan: 1
        },
        {
          name: 'maxMarks',
          label: 'Maximum Marks',
          type: 'input',
          placeholder: 'Enter maximum marks',
          colSpan: 1
        },
        {
          name: 'passMarks',
          label: 'Passing Marks',
          type: 'input',
          placeholder: 'Enter passing marks',
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
    academicYearId: initialData?.academicYearId || '',
    termId: initialData?.termId || '',
    name: initialData?.name || '',
    description: initialData?.description || '',
    type: initialData?.type || 'test',
    startDate: initialData?.startDate || '',
    maxMarks: initialData?.maxMarks || '',
    passMarks: initialData?.passMarks || '',
    endDate: initialData?.endDate || '',
    isActive: initialData?.isActive || true
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
          formConfig={examConfig}
          pageTitle={pageTitle}
          apiBasePath='/api/exams'
          formSchema={formSchema}
        />
      </CardContent>
    </Card>
  );
}