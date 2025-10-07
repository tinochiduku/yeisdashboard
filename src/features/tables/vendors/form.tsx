'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as z from 'zod';
import { vendors } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import DynamicForm from '@/components/form/dynamic-form';
import { FieldConfig } from '@/components/form/field-config';
import { useApiData } from '@/hooks/use-apidata';

const formSchema = z.object({
  name: z.string().min(1, "Vendor name is required").max(255, "Name too long"),
  contactPerson: z.string().max(255, "Contact person name too long").optional(),
  phone: z.string().max(20, "Phone number too long").optional(),
  email: z.string().email("Invalid email address").max(255, "Email too long").optional(),
  address: z.string().optional(),
  category: z.string().max(100, "Category too long").optional(),
  taxNumber: z.string().max(100, "Tax number too long").optional(),
  bankDetails: z.string().optional(), // Will handle as JSON
  contractDetails: z.string().optional(), // Will handle as JSON
  rating: z.coerce.number().min(0).max(5).optional(),
  isActive: z.boolean().default(true)
});
export default function VendorForm({
  id,
  edit,
  initialData,
  pageTitle
}: {
  id?: string
  edit?: boolean
  initialData?: InferSelectModel<typeof vendors> | null;
  pageTitle: string;
}) {

  const { data, isLoading, error } = useApiData({
    endpoints: ['schools']
  })

  const schools  = (data.schools ?? []).map((item) => ({label: item.name, value: item.id}))
  
  const vendorConfig: FieldConfig[] = [
    {
      name: 'schoolId',
      label: 'School',
      type: 'combobox',
      options: schools,
      placeholder: 'Select School',
      required: true,
      colSpan: 1
    },
    {
      name: 'name',
      label: 'Vendor Name',
      type: 'input',
      placeholder: 'Enter vendor name',
      required: true,
      colSpan: 1
    },
    {
      name: 'contactPerson',
      label: 'Contact Person',
      type: 'input',
      placeholder: 'Enter contact person name',
      colSpan: 1
    },
    {
      name: 'category',
      label: 'Category',
      type: 'input',
      placeholder: 'e.g., supplies, maintenance, food',
      colSpan: 1
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
      name: 'taxNumber',
      label: 'Tax Number',
      type: 'input',
      placeholder: 'Enter tax identification number',
      colSpan: 1
    },
    {
      name: 'address',
      label: 'Address',
      type: 'textarea',
      placeholder: 'Enter vendor address',
      colSpan: 2
    },
    {
      name: 'rating',
      label: 'Rating',
      type: 'input',
      placeholder: 'Enter rating (0-5)',
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
  schoolId: initialData?.name || '',
  name: initialData?.name || '',
  contactPerson: initialData?.contactPerson || '',
  category: initialData?.category || '',
  phone: initialData?.phone || '',
  email: initialData?.email || '',
  address: initialData?.address || '',
  taxNumber: initialData?.taxNumber || '',
  rating: initialData?.rating ? Number(initialData.rating) : '',
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
          formConfig={vendorConfig}
          pageTitle={pageTitle}
          apiBasePath='/api/vendors'
          formSchema={formSchema}
        />
      </CardContent>
    </Card>
  );
}