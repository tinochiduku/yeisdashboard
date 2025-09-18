'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { transportVehicles } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

export const columns: ColumnDef<InferSelectModel<typeof transportVehicles>>[] = [
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
    accessorKey: 'vehicleNumber',
    header: 'VEHICLE NUMBER'
  },
  {
    accessorKey: 'vehicleType',
    header: 'VEHICLE TYPE'
  },
  {
    accessorKey: 'capacity',
    header: 'CAPACITY'
  },
  {
    accessorKey: 'insuranceExpiry',
    header: 'INSURANCE EXPIRY'
  },
  {
    accessorKey: 'permitExpiry',
    header: 'PERMIT EXPIRY'
  },
  {
    accessorKey: 'fitnessExpiry',
    header: 'FITNESS EXPIRY'
  },
  {
    accessorKey: 'fuelType',
    header: 'FUEL TYPE'
  },
  {
    accessorKey: 'averageMileage',
    header: 'AVERAGE MILEAGE'
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