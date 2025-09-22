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
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const SubjectsPage = () => {
  const router = useRouter()
  const [subjects, setSubjects] = useState([])

  useEffect(() => {

    let sub = false

    const fetchClasses = async () => {
      const res = await fetch(`/api/subjects`, { cache: 'no-store' });
      if (!res.ok) {
        toast.error('Failed to Fetch Subjects')
      }
      return res.json();
    }

    if (!sub) {
      (async function() {
          const data = await fetchClasses()
          setSubjects(data)
      })()
    }

    return () => { sub = true}
  }, [])

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className=''>
            <CardTitle>Subjects</CardTitle>
            <CardDescription>
              A list of all the subjects in your school.
            </CardDescription>
          </div>
            <Button onClick={() => router.push('/academic/subjects/new')}>
              <Icons.plus className='mr-2 size-4' />
              Add Subject
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={subjects} />
      </CardContent>
    </Card>
  );
};

export default SubjectsPage;
