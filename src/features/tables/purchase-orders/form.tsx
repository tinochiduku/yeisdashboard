'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as z from 'zod';
import { purchaseOrders } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import DynamicForm from '@/components/form/dynamic-form';
import { FieldConfig } from '@/components/form/field-config';
import { useApiData } from '@/hooks/use-apidata';

const formSchema = z.object({
  schoolId: z.string().uuid("Please select a school"),
  vendorId: z.string().uuid("Please select a valid vendor"),
  orderNumber: z.string().min(1, "Order number is required").max(100, "Order number too long"),
  orderDate: z.string().min(1, "Order date is required"),
  expectedDelivery: z.string().optional(),
  actualDelivery: z.string().optional(),
  items: z.array(z.object({
    name: z.string().min(1, "Item name required"),
    quantity: z.coerce.number().positive("Quantity must be positive"),
    unitPrice: z.coerce.number().positive("Unit price must be positive"),
    total: z.coerce.number().positive("Total must be positive")
  })).min(1, "At least one item is required"),
  totalAmount: z.coerce.number().positive("Total amount must be positive"),
  taxAmount: z.coerce.number().min(0, "Tax amount cannot be negative").optional(),
  discountAmount: z.coerce.number().min(0, "Discount amount cannot be negative").optional(),
  finalAmount: z.coerce.number().positive("Final amount must be positive"),
  status: z.enum(["pending", "approved", "ordered", "received", "cancelled"] as const),
  remarks: z.string().optional(),
  approvedBy: z.string().uuid(),
  receivedBy: z.string().uuid(),
  attachments: z.string(),
});


export default function PurchaseOrderForm({
  id,
  edit,
  initialData,
  pageTitle
}: {
  id?: string
  edit?: boolean
  initialData?: InferSelectModel<typeof purchaseOrders> | null;
  pageTitle: string;
}) {

  const {data, isLoading, error } = useApiData({
    endpoints: ['vendors','users', 'schools']
  })

  const _users = (data.users ?? []).filter(({isPending}) => isPending === false)
  const users = _users.map(({firstName, lastName, id}) => ({label: `${firstName} ${lastName}`, value: id}))
  const vendors = (data.vendors ?? []).map(({contactPerson, id}) => ({label: contactPerson, value: id}))
  const schools =  (data.schools ?? []).map(({name, id}) => ({label: name, value: id}))

    const defaultValues = {
      schoolId: initialData?.schoolId || '',
      vendorId: initialData?.vendorId || '',
      orderNumber: initialData?.orderNumber || '',
      orderDate: initialData?.orderDate || '',
      expectedDelivery: initialData?.expectedDelivery || '',
      actualDelivery: initialData?.actualDelivery || '',
      items: initialData?.items || [],
      totalAmount: initialData?.totalAmount || 0,
      taxAmount: initialData?.taxAmount || 0,
      discountAmount: initialData?.discountAmount || 0,
      finalAmount: initialData?.finalAmount || 0,
      status: initialData?.status || 'pending',
      remarks: initialData?.remarks || '',
      approvedBy: initialData?.approvedBy || '',
      receivedBy: initialData?.receivedBy || '',
      attachments: initialData?.attachments || ''
    };

    const purchaseOrderConfig: FieldConfig[] = [
      {
        name: 'schoolId',
        label: 'School',
        type: 'select',
        required: true,
        placeholder: 'Select school',
        colSpan: 1,
        options: schools, // You'll need to provide schools array
      },
      {
        name: 'vendorId',
        label: 'Vendor',
        type: 'select',
        required: true,
        placeholder: 'Select vendor',
        colSpan: 1,
        options: vendors,
      },
      {
        name: 'orderNumber',
        label: 'Order Number',
        type: 'input',
        placeholder: 'Enter order number',
        required: true,
        colSpan: 1
      },
      {
        name: 'orderDate',
        label: 'Order Date',
        type: 'date',
        required: true,
        colSpan: 1
      },
      {
        name: 'expectedDelivery',
        label: 'Expected Delivery',
        type: 'date',
        colSpan: 1
      },
      {
        name: 'actualDelivery',
        label: 'Actual Delivery',
        type: 'date',
        colSpan: 1
      },
      {
        name: 'totalAmount',
        label: 'Total Amount',
        type: 'input',
        placeholder: '0.00',
        required: true,
        colSpan: 1
      },
      {
        name: 'taxAmount',
        label: 'Tax Amount',
        type: 'input',
        placeholder: '0.00',
        colSpan: 1
      },
      {
        name: 'discountAmount',
        label: 'Discount Amount',
        type: 'input',
        placeholder: '0.00',
        colSpan: 1
      },
      {
        name: 'finalAmount',
        label: 'Final Amount',
        type: 'input',
        placeholder: '0.00',
        required: true,
        colSpan: 1
      },
      {
        name: 'status',
        label: 'Order Status',
        type: 'select',
        required: true,
        colSpan: 1,
        options: [
          { label: 'Pending', value: 'pending' },
          { label: 'Approved', value: 'approved' },
          { label: 'Ordered', value: 'ordered' },
          { label: 'Received', value: 'received' },
          { label: 'Cancelled', value: 'cancelled' }
        ]
      },
      {
        name: 'remarks',
        label: 'Remarks',
        type: 'textarea',
        placeholder: 'Enter any remarks',
        colSpan: 2
      },
      {
        name: 'approvedBy',
        label: 'Approved By',
        type: 'select',
        placeholder: 'Select approver',
        colSpan: 1,
        options: users, // You'll need to provide users array
      },
      {
        name: 'receivedBy',
        label: 'Received By',
        type: 'select',
        placeholder: 'Select receiver',
        colSpan: 1,
        options: users, // You'll need to provide users array
      },
      {
        name: 'attachments',
        label: 'Attachments',
        type: 'textarea',
        placeholder: 'Enter attachment URLs or paths',
        colSpan: 2
      }
    ];


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
            formConfig={purchaseOrderConfig}
            pageTitle={pageTitle}
            apiBasePath='/api/vendors'
            formSchema={formSchema}
          />
      </CardContent>
    </Card>
  );
}

// Item line component schema
const itemSchema = z.object({
  name: z.string().min(1, "Item name required"),
  quantity: z.coerce.number().positive("Quantity must be positive"),
  unitPrice: z.coerce.number().positive("Unit price must be positive"),
  total: z.coerce.number().positive("Total must be positive")
});

// Field config for individual items
const itemFieldConfig: FieldConfig[] = [
  {
    name: 'name',
    label: 'Item Name',
    type: 'input',
    placeholder: 'Enter item name',
    required: true,
    colSpan: 1
  },
  {
    name: 'quantity',
    label: 'Quantity',
    type: 'input',
    placeholder: 'Enter quantity',
    required: true,
    colSpan: 1
  },
  {
    name: 'unitPrice',
    label: 'Unit Price',
    type: 'input',
    placeholder: 'Enter unit price',
    required: true,
    colSpan: 1
  },
  {
    name: 'total',
    label: 'Total',
    type: 'input',
    placeholder: 'Calculated total',
    required: true,
    colSpan: 1
  }
];