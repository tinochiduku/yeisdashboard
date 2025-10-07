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

const GradesPage = () => {
    const router = useRouter()
  
    const { data, isLoading, error } = useApiData({
      endpoints: ['grades']
    });
    
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className=''>
            <CardTitle>Grades</CardTitle>
            <CardDescription>
              A list of all the grades in your school.
            </CardDescription>
          </div>
          <Button onClick={() => router.push('/examinations/grades/new')}>
            <Icons.plus className='mr-2 size-4' />
            Add Grade
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={(data.grades ?? [])} />
      </CardContent>
    </Card>
  );
};

export default GradesPage;
