'use client';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useRouter } from 'next/navigation';
import { useApiData } from '@/hooks/use-apidata';

const PurchaseOrdersPage = () => {
  const router = useRouter()
  const { data, isLoading, error } = useApiData({
    endpoints: ['purchaseOrders']
  })

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className=''>
            <CardTitle>Purchase Orders</CardTitle>
            <CardDescription>
              A list of all the purchase orders in your school.
            </CardDescription>
          </div>
          <Button onClick={() => router.push('/purchase-orders/new')}>
            <Icons.plus className='mr-2 size-4' />
            Create Order
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={(data.purchaseOrders ?? [])} />
      </CardContent>
    </Card>
  );
};

export default PurchaseOrdersPage;
