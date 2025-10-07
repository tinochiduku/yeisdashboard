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

const ExamSubjectsPage = () => {
  const router = useRouter()

  const { data, isLoading, error } = useApiData({
    endpoints: ['examSubjects']
  });
  
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className=''>
            <CardTitle>Exam Subjects</CardTitle>
            <CardDescription>
              A list of all the exam subjects in your school.
            </CardDescription>
          </div>
          <Button onClick={() => router.push('/examinations/exam-subjects/new')}>
            <Icons.plus className='mr-2 size-4' />
            Add Exam Subject
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={(data.examSubjects ?? [])} />
      </CardContent>
    </Card>
  );
};

export default ExamSubjectsPage;
