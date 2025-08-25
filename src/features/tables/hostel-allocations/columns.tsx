'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { hostelAllocations } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

export const columns: ColumnDef<InferSelectModel<typeof hostelAllocations>>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'allocationDate',
    header: 'ALLOCATION DATE'
  },
  {
    accessorKey: 'vacationDate',
    header: 'VACATION DATE'
  },
  {
    accessorKey: 'monthlyFee',
    header: 'MONTHLY FEE'
  },
  {
    accessorKey: 'isActive',
    header: 'ACTIVE'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
