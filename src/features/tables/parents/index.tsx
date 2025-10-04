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
import { getData } from '@/utils/requests/dataQuery';

const ParentsPage = () => {
  const router = useRouter()
  const [parents, setParents] = useState([])

  useEffect(() => {
    let sub = false
    if (!sub) {
      (async function () {
        const _parents = await getData({
          title: 'Fetch Parents',
          url: '/api/parents'
        })
        setParents(_parents)
      })()
    }
    return () =>  { sub = true}
  },[])

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className=''>
            <CardTitle>Parents</CardTitle>
            <CardDescription>
              A list of all the parents in your school.
            </CardDescription>
          </div>
          <Button onClick={() => router.push('/students/parents/new')}>
            <Icons.plus className='mr-2 size-4' />
            Add Parent
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={parents} />
      </CardContent>
    </Card>
  );
};

export default ParentsPage;
