'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { payrollStructure } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

export const columns: ColumnDef<InferSelectModel<typeof payrollStructure>>[] = [
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
    accessorKey: 'basicSalary',
    header: 'BASIC SALARY'
  },
  {
    accessorKey: 'grossSalary',
    header: 'GROSS SALARY'
  },
  {
    accessorKey: 'netSalary',
    header: 'NET SALARY'
  },
  {
    accessorKey: 'effectiveFrom',
    header: 'EFFECTIVE FROM'
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
