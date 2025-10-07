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

const ExamsPage = () => {

  const router = useRouter()

    const { data, isLoading, error } = useApiData({
      endpoints: ['exams']
    });

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className=''>
            <CardTitle>Exams</CardTitle>
            <CardDescription>
              A list of all the exams in your school.
            </CardDescription>
          </div>
          <Button onClick={() => router.push('/examinations/exams/new')}>
            <Icons.plus className='mr-2 size-4' />
            Add Exam
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={(data.exams ?? [])} />
      </CardContent>
    </Card>
  );
};

export default ExamsPage;
