'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as z from 'zod';
import { grades, gradeScale } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { FieldConfig } from '@/components/form/field-config';
import { useApiData } from '@/hooks/use-apidata';
import DynamicForm from '@/components/form/dynamic-form';

const formSchema = z.object({
  studentId: z.string().uuid("Invalid student ID").min(1, "Student is required"),
  examId: z.string().uuid("Invalid exam ID").min(1, "Exam is required"),
  subjectId: z.string().uuid("Invalid subject ID").min(1, "Subject is required"),
  marksObtained: z.coerce.number().min(0, "Marks obtained cannot be negative"),
  maxMarks: z.coerce.number().min(1, "Maximum marks must be at least 1"),
  grade: z.enum(gradeScale.enumValues, {
    required_error: "Grade is required",
  }),
  percentage: z.coerce.number().min(0, "Percentage cannot be negative").max(100, "Percentage cannot exceed 100"),
  remarks: z.string().optional(),
  teacherId: z.string().uuid("Invalid teacher ID").min(1, "Teacher is required"),
  isPublished: z.boolean().default(false)
  })
  .refine((data) => data.marksObtained <= data.maxMarks, {
    message: "Marks obtained cannot exceed maximum marks",
    path: ["marksObtained"]
  })
  .refine((data) => {
    const calculatedPercentage = (data.marksObtained / data.maxMarks) * 100;
    // Allow small rounding differences (0.01%)
    return Math.abs(calculatedPercentage - data.percentage) < 0.01;
  }, {
    message: "Percentage does not match calculated value (marks obtained / max marks × 100)",
    path: ["percentage"]
  });

export default function GradeForm({
  id,
  edit,
  initialData,
  pageTitle
}: {
  id?: string
  edit?: boolean
  initialData?: InferSelectModel<typeof grades> | null;
  pageTitle: string;
}) {
  const { data, isLoading, error } = useApiData({
    endpoints: ['exams', 'students', 'subjects', 'teachers']
  });

  const exams = (data.exams ?? []).map((item:any) => ({ value: item.id, label: item.name}))
  const _students = (data.students ?? []).map((item:any) => ({...item, name: `${item.firstName} ${item.lastName}`}))
  const students = (_students ?? []).map((item:any) => ({ value: item.id, label: item.name}))
  const subjects = (data.subjects ?? []).map((item:any) => ({ value: item.id, label: item.name}))
  const teachers = (data.teachers ?? []).map((item:any) => ({ value: item.id, label: item.name}))

  const gradeConfig: FieldConfig[] = [
    {
      name: 'studentId',
      label: 'Student',
      type: 'combobox',
      options: students,
      required: true,
      placeholder: 'Select student',
      colSpan: 1
    },
    {
      name: 'examId',
      label: 'Exam',
      type: 'combobox',
      options: exams,
      required: true,
      placeholder: 'Select exam',
      colSpan: 1
    },
    {
      name: 'subjectId',
      label: 'Subject',
      type: 'combobox',
      options: subjects,
      required: true,
      placeholder: 'Select subject',
      colSpan: 1
    },
    {
      name: 'marksObtained',
      label: 'Marks Obtained',
      type: 'input',
      placeholder: 'Enter marks obtained',
      colSpan: 1
    },
    {
      name: 'maxMarks',
      label: 'Maximum Marks',
      type: 'input',
      required: true,
      placeholder: 'Enter maximum marks',
      colSpan: 1
    },
    {
      name: 'grade',
      label: 'Grade',
      type: 'select',
      options: [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' },
        { label: 'D', value: 'D' },
        { label: 'F', value: 'F' }
      ],
      colSpan: 1
    },
    {
      name: 'percentage',
      label: 'Percentage',
      type: 'input',
      placeholder: 'Enter percentage',
      colSpan: 1
    },
    {
      name: 'remarks',
      label: 'Remarks',
      type: 'textarea',
      placeholder: 'Enter remarks',
      colSpan: 2
    },
    {
      name: 'teacherId',
      label: 'Teacher',
      type: 'combobox',
      options: teachers,
      placeholder: 'Select teacher',
      colSpan: 1
    },
    {
      name: 'isPublished',
      label: 'Publish Results',
      type: 'checkbox',
      colSpan: 1
    }
  ];

  const defaultValues = {
    studentId: initialData?.studentId || '',
    examId: initialData?.examId || '',
    subjectId: initialData?.subjectId || '',
    marksObtained: initialData?.marksObtained ? parseFloat(initialData.marksObtained) : 0,
    maxMarks: initialData?.maxMarks || 100,
    grade: initialData?.grade || gradeScale.enumValues[0],
    percentage: initialData?.percentage ? parseFloat(initialData.percentage) : 0,
    remarks: initialData?.remarks || '',
    teacherId: initialData?.teacherId || '',
    isPublished: initialData?.isPublished || false
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
          formConfig={gradeConfig}
          pageTitle={pageTitle}
          apiBasePath='/api/grades'
          formSchema={formSchema}
        />
      </CardContent>
    </Card>
  );
}