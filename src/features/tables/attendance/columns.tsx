'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { attendance } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import AttendanceModal from './modal';

export const columns: ColumnDef<InferSelectModel<typeof attendance>>[] = [
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
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'className',
    header: 'CLASS'
  },
  {
    accessorKey: 'date',
    header: 'DATE'
  },
  {
    accessorKey: 'status',
    header: 'STATUS', 
    cell: ({row}) => <AttendanceModal data={row.original} />
  },
  {
    id: 'actions',
    header: 'ACTIONS',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
