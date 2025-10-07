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

const ExpensesPage = () => {
  const router = useRouter()
    const {data, isLoading, error} = useApiData({
      endpoints: ['expenses']
    })
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className=''>
            <CardTitle>Expenses</CardTitle>
            <CardDescription>
              A list of all the expenses in your school.
            </CardDescription>
          </div>
          <Button onClick={() => router.push('/finance/expenses/new')}>
            <Icons.plus className='mr-2 size-4' />
            Add Expense
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={(data.expenses ?? [])} />
      </CardContent>
    </Card>
  );
};

export default ExpensesPage;
