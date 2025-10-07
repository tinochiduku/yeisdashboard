'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as z from 'zod';
import { expenseCategories } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { FieldConfig } from '@/components/form/field-config';
import DynamicForm from '@/components/form/dynamic-form';
import { useApiData } from '@/hooks/use-apidata';

const formSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1, "Category name is required").max(255, "Name too long"),
  description: z.string().optional(),
  budgetLimit: z.coerce.number().positive("Budget limit must be positive").optional(),
  isActive: z.boolean().default(true)
});

export default function ExpenseCategoryForm({
  id,
  edit,
  initialData,
  pageTitle
}: {
  id?: string
  edit?: boolean
  initialData?: InferSelectModel<typeof expenseCategories> | null;
  pageTitle: string;
}) {

  const { data, isLoading, error } = useApiData({
    endpoints: ['schools']
  })

  const schools  = (data.schools ?? []).map((item) => ({label: item.name, value: item.id}))

  const expenseCategoryConfig: FieldConfig[] = [
  {
    name: 'schoolId',
    label: 'School',
    type: 'combobox',
    options: schools,
    placeholder: 'Select Schools',
    colSpan: 1
  },
  {
    name: 'name',
    label: 'Category Name',
    type: 'input',
    placeholder: 'Enter expense category name',
    colSpan: 1
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter category description',
    colSpan: 1
  },
  {
    name: 'budgetLimit',
    label: 'Budget Limit',
    type: 'input',
    placeholder: 'Enter budget limit for this category',
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
  name: initialData?.name || '',
  description: initialData?.description || '',
  budgetLimit: initialData?.budgetLimit || 0,
  isActive: initialData?.isActive ?? true
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
          formConfig={expenseCategoryConfig}
          pageTitle={pageTitle}
          apiBasePath='/api/expense-categories'
          formSchema={formSchema}
        />
      </CardContent>
    </Card>
  );
}