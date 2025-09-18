'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { leaves } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

export const columns: ColumnDef<InferSelectModel<typeof leaves>>[] = [
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
    accessorKey: 'applicantType',
    header: 'APPLICANT TYPE'
  },
  {
    accessorKey: 'leaveType',
    header: 'LEAVE TYPE'
  },
  {
    accessorKey: 'startDate',
    header: 'START DATE'
  },
  {
    accessorKey: 'endDate',
    header: 'END DATE'
  },
  {
    accessorKey: 'days',
    header: 'DAYS'
  },
  {
    accessorKey: 'reason',
    header: 'REASON'
  },
  {
    accessorKey: 'status',
    header: 'STATUS'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];