'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as z from 'zod';
import { examSubjects } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { FieldConfig } from '@/components/form/field-config';
import { useApiData } from '@/hooks/use-apidata';
import DynamicForm from '@/components/form/dynamic-form';

const formSchema = z.object({
  examId: z.string().uuid(),
  subjectId: z.string().uuid(),
  classId: z.string().uuid(),
  maxMarks: z.coerce.number().min(1, "Maximum marks must be at least 1"),
  passMarks: z.coerce.number().min(0, "Pass marks cannot be negative"),
  examDate: z.string().min(1, "Exam date is required"),
  examTime: z.string().optional(),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute").optional(),
  room: z.string().max(50, "Room number too long").optional(),
  instructions: z.string().optional()
}).refine((data) => data.passMarks <= data.maxMarks, {
  message: "Pass marks cannot exceed maximum marks",
  path: ["passMarks"]
});

export default function ExamSubjectForm({
  id,
  edit,
  initialData,
  pageTitle
}: {
  id?: string
  edit?: boolean
  initialData?: InferSelectModel<typeof examSubjects> | null;
  pageTitle: string;
}) {

  const { data, isLoading, error } = useApiData({
      endpoints: ['exams', 'subjects', 'classes']
    });
    
  const exams = (data.exams ?? []).map((item:any) => ({ value: item.id, label: item.name}))
  const subjects = (data.subjects ?? []).map((item:any) => ({ value: item.id, label: item.name}))
  const classes = (data.classes ?? []).map((item:any) => ({ value: item.id, label: item.name}))

  const examSubjectConfig: FieldConfig[] = [
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
      name: 'classId',
      label: 'Class',
      type: 'combobox',
      options: classes,
      required: true,
      placeholder: 'Select class',
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
      name: 'passMarks',
      label: 'Passing Marks',
      type: 'input',
      required: true,
      placeholder: 'Enter passing marks',
      colSpan: 1
    },
    {
      name: 'examDate',
      label: 'Exam Date',
      type: 'date',
      colSpan: 1
    },
    {
      name: 'examTime',
      label: 'Exam Time',
      type: 'input',
      placeholder: 'Enter exam time',
      colSpan: 1
    },
    {
      name: 'duration',
      label: 'Duration (minutes)',
      type: 'input',
      placeholder: 'Enter duration in minutes',
      colSpan: 1
    },
    {
      name: 'room',
      label: 'Room',
      type: 'input',
      placeholder: 'Enter room number',
      colSpan: 1
    },
    {
      name: 'instructions',
      label: 'Instructions',
      type: 'textarea',
      placeholder: 'Enter exam instructions',
      colSpan: 2
    }
  ];

  const defaultValues = {
    examId: initialData?.examId || '',
    subjectId: initialData?.subjectId || '',
    classId: initialData?.classId || '',
    maxMarks: initialData?.maxMarks || 100,
    passMarks: initialData?.passMarks || 50,
    examDate: initialData?.examDate ? new Date(initialData.examDate).toISOString().split('T')[0] : '',
    examTime: initialData?.examTime || '',
    duration: initialData?.duration || 180,
    room: initialData?.room || '',
    instructions: initialData?.instructions || ''
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
          formConfig={examSubjectConfig}
          pageTitle={pageTitle}
          apiBasePath='/api/exam-subjects'
          formSchema={formSchema}
        />
      </CardContent>
    </Card>
  );
}