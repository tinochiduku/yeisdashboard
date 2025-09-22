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

const TimetablePage = () => {
  const router = useRouter()

  const [ entries, setEntries ] = useState([])

  useEffect(() => {

    let sub = false

    const fetchData = async () => {
      const res = await fetch(`/api/timetables`, { cache: 'no-store' });
      if (!res.ok) {
        toast.error('Failed to Fetch Entries')
      }
      return res.json();
    }

    if (!sub) {
      (async function() {
          const data = await fetchData()
          setEntries(data)
      })()
    }

    return () => { sub = true}
  }, [])

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className=''>
            <CardTitle>Timetable</CardTitle>
            <CardDescription>
              A list of all the timetable entries in your school.
            </CardDescription>
          </div>
          <Button onClick={() => router.push('/academic/timetable/new')}>
            <Icons.plus className='mr-2 size-4' />
            Add Timetable Entry
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={entries} />
      </CardContent>
    </Card>
  );
};

export default TimetablePage;
