'use client';
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
import { getData } from '@/utils/requests/dataQuery';
import { IconScan } from '@tabler/icons-react';

const AttendancePage = () => {
  const [attendance, setAttendance] = useState([])

  useEffect(() => {
  
      let sub = false
  
      const fetchData = async () => {

          const _attendance = await getData({ 
            title: 'Fetch Attendance', 
            url: `/api/attendance-records` 
          });
  
          setAttendance(_attendance)        
      }
  
      if (!sub) {
        (async function() {
           await fetchData()
        })()
      }
  
      return () => { sub = true}
    }, [])

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className=''>
            <CardTitle>Attendance</CardTitle>
            <CardDescription>
              A list of all the attendance records in your school.
            </CardDescription>
          </div>
          <button className='flex items-center gap-2 bg-blue-100 text-blue-800 px-2 py-1 rounded'>
            <IconScan size={20} />
            <span className='text-xs uppercase font-medium'>scan code</span>
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={attendance} />
      </CardContent>
    </Card>
  );
};

export default AttendancePage;
