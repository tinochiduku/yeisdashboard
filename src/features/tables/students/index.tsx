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
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const StudentsPage = () => {

    const [students, setStudents] = useState([])
  
    useEffect(() => {
  
      let sub = false
  
      const fetchClasses = async () => {
        const res = await fetch(`/api/students`, { cache: 'no-store' });
        if (!res.ok) {
          toast.error('Failed to Fetch Students')
        }
        return res.json();
      }
  
      if (!sub) {
        (async function() {
            const data = await fetchClasses()
            setStudents(data)
        })()
      }
  
      return () => { sub = true}
    }, [])

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className=''>
            <CardTitle>Students</CardTitle>
            <CardDescription>
              A list of all the students in your school.
            </CardDescription>
          </div>
          <Link href='/students/new'>
            <Button>
              <Icons.plus className='mr-2 size-4' />
              Add Student
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={students} />
      </CardContent>
    </Card>
  );
};

export default StudentsPage;
