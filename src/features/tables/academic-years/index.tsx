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

const AcademicYearsPage = () => {
  const router = useRouter()
  const [years, setYears ] = useState([])

  useEffect(() => {
  
      let sub = false
  
      const fetchYears = async () => {
        const res = await fetch(`/api/academic-years`, { cache: 'no-store' });
        if (!res.ok) {
          toast.error('Failed to Fetch Years')
        }
        return res.json();
      }
  
      if (!sub) {
        (async function() {
            const data = await fetchYears()
            setYears(data)
        })()
      }
  
      return () => { sub = true}
    }, [])
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className=''>
            <CardTitle>Academic Years</CardTitle>
            <CardDescription>
              A list of all the academic years in your school.
            </CardDescription>
          </div>
          <Button onClick={() => router.push('/academic/years/new')}>
            <Icons.plus className='mr-2 size-4' />
            Add Academic Year
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={years} />
      </CardContent>
    </Card>
  );
};

export default AcademicYearsPage;
