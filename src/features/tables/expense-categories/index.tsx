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

const ExpenseCategoriesPage = () => {

  const router = useRouter()
    const {data, isLoading, error} = useApiData({
      endpoints: ['expenseCategories']
    })

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className=''>
            <CardTitle>Expense Categories</CardTitle>
            <CardDescription>
              A list of all the expense categories in your school.
            </CardDescription>
          </div>
          <Button onClick={() => router.push('/finance/expense-categories/new')}>
            <Icons.plus className='mr-2 size-4' />
            Add Expense Category
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={(data.expenseCategories ?? [])} />
      </CardContent>
    </Card>
  );
};

export default ExpenseCategoriesPage;
