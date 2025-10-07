'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as z from 'zod';
import { expenses, paymentMethod } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { FieldConfig } from '@/components/form/field-config';
import DynamicForm from '@/components/form/dynamic-form';
import { useApiData } from '@/hooks/use-apidata';

const formSchema = z.object({
  categoryId: z.string().uuid("Please select a valid category"),
  title: z.string().min(1, "Title is required").max(255, "Title too long"),
  description: z.string().optional(),
  amount: z.coerce.number().positive("Amount must be positive"),
  expenseDate: z.string().min(1, "Expense date is required"),
  paymentMethod: z.enum(paymentMethod.enumValues),
  vendorId: z.string().uuid("Please select a valid vendor").optional(),
  status: z.enum(["pending", "approved", "rejected", "paid"] as const),
  submittedBy: z.string().uuid("Please select a valid user").optional(),
  approvedBy: z.string().uuid("Please select a valid user").optional(),
  approvalDate: z.string().optional(),
  rejectionReason: z.string().optional(),
});

export default function ExpenseForm({
  id,
  edit,
  initialData,
  pageTitle
}: {
  id?: string
  edit?: boolean
  initialData?: InferSelectModel<typeof expenses> | null;
  pageTitle: string;
}) {

   const { data, isLoading, error } = useApiData({
      endpoints: ['vendors', 'expenseCategories', 'users']
    }) 
  
    const vendors = (data.vendors ?? []).map((item) => ({label: item.contactPerson, value: item.id}))
    const expenseCategories = (data.expenseCategories ?? []).map((item) => ({label: item.name, value: item.id}))
    const _users = (data.users ?? []).filter(({ isPending }) => isPending === false )
    const users = _users.map((item) => ({label: `${item.firstName} ${item.lastName}`, value: item.userId}))

  const expenseConfig: FieldConfig[] = [
  {
    name: 'categoryId',
    label: 'Expense Category',
    type: 'select',
    required: true,
    placeholder: 'Select expense category',
    colSpan: 1,
    options: expenseCategories,
  },
  {
    name: 'title',
    label: 'Expense Title',
    type: 'input',
    placeholder: 'Enter expense title',
    required: true,
    colSpan: 1
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter expense description',
    colSpan: 2
  },
  {
    name: 'amount',
    label: 'Amount',
    type: 'input',
    placeholder: 'Enter expense amount',
    required: true,
    colSpan: 1
  },
  {
    name: 'expenseDate',
    label: 'Expense Date',
    type: 'date',
    required: true,
    colSpan: 1
  },
  {
    name: 'paymentMethod',
    label: 'Payment Method',
    type: 'select',
    required: true,
    placeholder: 'Select payment method',
    colSpan: 1,
    options: [
      { label: 'Cash', value: 'cash' },
      { label: 'Bank Transfer', value: 'bank_transfer' },
      { label: 'Mobile Money', value: 'mobile_money' },
      { label: 'Card', value: 'card' },
      { label: 'Cheque', value: 'cheque' }
    ]
  },
  {
    name: 'vendorId',
    label: 'Vendor',
    type: 'select',
    placeholder: 'Select vendor',
    colSpan: 1,
    options: vendors,
  },
  {
    name: 'status',
    label: 'Expense Status',
    type: 'select',
    required: true,
    placeholder: 'Select status',
    colSpan: 1,
    options: [
      { label: 'Pending', value: 'pending' },
      { label: 'Approved', value: 'approved' },
      { label: 'Rejected', value: 'rejected' },
      { label: 'Paid', value: 'paid' }
    ]
  },
  {
    name: 'submittedBy',
    label: 'Submitted By',
    type: 'select',
    placeholder: 'Select submitter',
    colSpan: 1,
    options: users,
  },
  {
    name: 'approvedBy',
    label: 'Approved By',
    type: 'select',
    placeholder: 'Select approver',
    colSpan: 1,
    options: users,
  },
  {
    name: 'approvalDate',
    label: 'Approval Date',
    type: 'date',
    colSpan: 1
  },
  {
    name: 'rejectionReason',
    label: 'Rejection Reason',
    type: 'textarea',
    placeholder: 'Enter reason for rejection',
    colSpan: 2
  }
];

  const defaultValues = {
  categoryId: initialData?.categoryId || '',
  title: initialData?.title || '',
  description: initialData?.description || '',
  amount: initialData?.amount ? Number(initialData.amount) : 0,
  expenseDate: initialData?.expenseDate ? new Date(initialData.expenseDate).toISOString().split('T')[0] : '',
  paymentMethod: initialData?.paymentMethod || 'cash',
  vendorId: initialData?.vendorId || '',
  status: initialData?.status || 'pending',
  submittedBy: initialData?.submittedBy || '',
  approvedBy: initialData?.approvedBy || '',
  approvalDate: initialData?.approvalDate ? new Date(initialData.approvalDate).toISOString().split('T')[0] : '',
  rejectionReason: initialData?.rejectionReason || '',
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
          formConfig={expenseConfig}
          pageTitle={pageTitle}
          apiBasePath='/api/expenses'
          formSchema={formSchema}
        />
      </CardContent>
    </Card>
  );
}