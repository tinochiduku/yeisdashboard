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
import { useEffect, useState } from 'react';
import {toast } from 'sonner'
import Link from 'next/link';

const ClassesPage = () => {

  const [classes, setClasses] = useState([])

  useEffect(() => {

    let sub = false

    const fetchClasses = async () => {
      const res = await fetch(`/api/classes`, { cache: 'no-store' });
      if (!res.ok) {
        toast.error('Failed to Fetch Classes')
      }
      return res.json();
    }

    if (!sub) {
      (async function() {
          const data = await fetchClasses()
          setClasses(data)
      })()
    }

    return () => { sub = true}
  }, [])

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className=''>
            <CardTitle>Classes</CardTitle>
            <CardDescription>
              A list of all the classes in your school.
            </CardDescription>
          </div>
          <Link href="/academic/classes/new">
            <Button>
              <Icons.plus className='mr-2 size-4' />
              Add Class
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={classes} />
      </CardContent>
    </Card>
  );
};

export default ClassesPage;
