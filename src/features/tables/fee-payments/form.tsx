'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as z from 'zod';
import { feePayments, feeStructure, paymentMethod, paymentStatus, students } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import DynamicForm from '@/components/form/dynamic-form';
import { FieldConfig } from '@/components/form/field-config';
import { useApiData } from '@/hooks/use-apidata';

const formSchema = z.object({
  studentId: z.string().uuid(),
  feeStructureId: z.string().uuid(),
  processedBy: z.string().uuid(),
  transactionId: z.string(),
  receiptNumber: z.coerce.number(),
  amount: z.coerce.number(),
  paymentDate: z.string(),
  remarks: z.string().optional(),
  paymentMethod: z.enum(paymentMethod.enumValues),
  status: z.enum(paymentStatus.enumValues)
});

export default function FeePaymentForm({
  id,
  edit,
  initialData,
  pageTitle
}: {
  id?: string
  edit?: boolean
  initialData?: InferSelectModel<typeof feePayments> | null;
  pageTitle: string;
}) {

  const { data, isLoading, error } = useApiData({
    endpoints: ['students', 'feeStructures', 'users']
  }) 

  const students = (data.students ?? []).map((item) => ({label: `${item.firstName} ${item.lastName}`, value: item.id}))
  const feeStructures = (data.feeStructures ?? []).map((item) => ({label: item.name, value: item.id}))
  const _users = (data.users ?? []).filter(({ isPending }) => isPending === false )
  const users = _users.map((item) => ({label: `${item.firstName} ${item.lastName}`, value: item.userId}))

  const feePaymentConfig: FieldConfig[] = [
    {
      name: 'studentId',
      label: 'Student',
      type: 'select',
      options: students,
      required: true,
      placeholder: 'Select student',
      colSpan: 1
    },
    {
      name: 'feeStructureId',
      label: 'Fee Structure',
      type: 'select',
      options: feeStructures,
      required: true,
      placeholder: 'Select fee structure',
      colSpan: 1
    },
    {
      name: 'amount',
      label: 'Amount',
      type: 'input',
      required: true,
      placeholder: 'Enter payment amount',
      colSpan: 1
    },
    {
      name: 'paymentDate',
      label: 'Payment Date',
      type: 'date',
      required: true,
      colSpan: 1
    },
    {
      name: 'paymentMethod',
      label: 'Payment Method',
      type: 'select',
      required: true,
      options: [
        { label: 'Cash', value: 'cash' },
        { label: 'Bank Transfer', value: 'bank_transfer' },
        { label: 'Mobile Money', value: 'mobile_money' },
        { label: 'Card', value: 'card' },
        { label: 'Cheque', value: 'cheque' }
      ],
      colSpan: 1
    },
    {
      name: 'transactionId',
      label: 'Transaction ID',
      type: 'input',
      placeholder: 'Enter transaction ID',
      colSpan: 1
    },
    {
      name: 'receiptNumber',
      label: 'Receipt Number',
      type: 'input',
      placeholder: 'Enter receipt number',
      colSpan: 1
    },
    {
      name: 'remarks',
      label: 'Remarks',
      type: 'textarea',
      placeholder: 'Enter payment remarks',
      colSpan: 2
    },
     {
      name: 'processedBy',
      label: 'Processed By',
      type: 'combobox',
      options: users,
      required: true,
      placeholder: 'Select Processor',
      colSpan: 1
    },
    {
      name: 'status',
      label: 'Payment Status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Overdue', value: 'overdue' },
        { label: 'Partial', value: 'partial' }
      ],
      colSpan: 1
    }
  ];

  const defaultValues = {
    studentId: initialData?.studentId || '',
    feeStructureId: initialData?.feeStructureId || '',
    remarks: initialData?.remarks || '',
    processedBy: initialData?.processedBy || '',
    transactionId: initialData?.transactionId || '',
    receiptNumber: initialData?.receiptNumber || '',
    amount: initialData?.amount || 0,
    paymentDate: initialData?.paymentDate || '',
    paymentMethod: initialData?.paymentMethod || 'cash',
    status: initialData?.status || 'pending'
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
          formConfig={feePaymentConfig}
          pageTitle={pageTitle}
          apiBasePath='/api/fee-payments'
          formSchema={formSchema}
        />
      </CardContent>
    </Card>
  );
}