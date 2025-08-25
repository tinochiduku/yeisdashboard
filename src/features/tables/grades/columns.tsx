'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { grades } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

export const columns: ColumnDef<InferSelectModel<typeof grades>>[] = [
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
    accessorKey: 'marksObtained',
    header: 'MARKS OBTAINED'
  },
  {
    accessorKey: 'grade',
    header: 'GRADE'
  },
  {
    accessorKey: 'percentage',
    header: 'PERCENTAGE'
  },
  {
    accessorKey: 'isPublished',
    header: 'PUBLISHED'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
