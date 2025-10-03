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
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

const AdmissionsPage = () => {

  const [admissions, setAddmissions] = useState([])

    useEffect(() => {

      let sub = false

      const fetchClasses = async () => {
        const res = await fetch(`/api/students`, { cache: 'no-store' });
        if (!res.ok) {
          toast.error('Failed to Fetch Admissions')
        }
        return res.json();
      }

      if (!sub) {
        (async function() {
            const data = await fetchClasses()
            setAddmissions(data)
        })()
      }

      return () => { sub = true}
    }, [])

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className=''>
            <CardTitle>Admissions</CardTitle>
            <CardDescription>
              A list of all the student admissions in your school.
            </CardDescription>
          </div>
          <Button>
            <Icons.plus className='mr-2 size-4' />
            Add Admission
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={admissions} />
      </CardContent>
    </Card>
  );
};

export default AdmissionsPage;
