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
import { getData } from '@/utils/requests/dataQuery';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const StaffPage = () => {
  const router = useRouter()
  const [staff, setStaff ] = useState([])


  useEffect(() => {
      let isMounted = true;
      
      const fetchData = async () => {
        try {
              const _staff = await getData({ 
                title: 'Fetch Staff', 
                url: `/api/staff` 
              });
              
              setStaff(_staff)

        } catch (error) {
          toast.error(`Failed to fetch data: ${error}`);
        }
      };
  
      if (isMounted) {
        fetchData();
      }
    
    
      return () => { 
        isMounted = false; 
      };
    }, [])

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className=''>
            <CardTitle>Staff</CardTitle>
            <CardDescription>
              A list of all the staff in your school.
            </CardDescription>
          </div>
          <Button onClick={() => router.push('/staff/staff-list/new')}>
            <Icons.plus className='mr-2 size-4' />
            Add Staff
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={staff} />
      </CardContent>
    </Card>
  );
};

export default StaffPage;
