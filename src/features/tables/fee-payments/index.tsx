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

const FeePaymentsPage = () => {
  const router = useRouter()
  const {data, isLoading, error} = useApiData({
    endpoints: ['feePayments']
  })

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className=''>
            <CardTitle>Fee Payments</CardTitle>
            <CardDescription>
              A list of all the fee payments in your school.
            </CardDescription>
          </div>
          <Button onClick={() => router.push('/finance/fee-payments/new')}>
            <Icons.plus className='mr-2 size-4' />
            Add Fee Payment
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={(data.feePayments ?? [])} />
      </CardContent>
    </Card>
  );
};

export default FeePaymentsPage;
