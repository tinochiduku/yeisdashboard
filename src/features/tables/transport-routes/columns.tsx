'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { transportRoutes } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

export const columns: ColumnDef<InferSelectModel<typeof transportRoutes>>[] = [
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
    accessorKey: 'routeName',
    header: 'ROUTE NAME'
  },
  {
    accessorKey: 'routeCode',
    header: 'ROUTE CODE'
  },
  {
    accessorKey: 'startPoint',
    header: 'START POINT'
  },
  {
    accessorKey: 'endPoint',
    header: 'END POINT'
  },
  {
    accessorKey: 'distance',
    header: 'DISTANCE'
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
