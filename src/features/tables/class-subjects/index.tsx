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

const ClassSubjectsPage = () => {
  const router = useRouter()
  const [subjects, setSubjects] = useState([])

  useEffect(() => {

    let sub = false

    const fetchData = async () => {

        const _class_subjects = await getData({ 
          title: 'Fetch Class Subjects', 
          url: `/api/class-subjects` 
        });

        const _subjects = await getData({ 
          title: 'Fetch Subjects', 
          url: `/api/subjects` 
        });

        const _teachers = await getData({ 
          title: 'Fetch Teachers', 
          url: `/api/staff` 
        });

        const _classes = await getData({ 
          title: 'Fetch Classes', 
          url: `/api/classes` 
        });
        
        const filter_teachers = _teachers.filter(({ staffType }: any) => staffType === 'teaching')

        return  _class_subjects.map(({
            id,
            classId, 
            subjectId,
            teacherId,
            isActive, 
            createdAt
          }: any) => ({
            id,
            isActive,
            createdAt,
            teacherName: `
              ${filter_teachers.filter(({id}: any) => id === teacherId)[0].firstName} 
              ${filter_teachers.filter(({id}: any) => id === teacherId)[0].lastName}
            `,
            className: _classes.filter(({id}: any) => id === classId)[0].name,
            subjectName: _subjects.filter(({id}: any) => id === subjectId)[0].name
        }))
      
    }

    if (!sub) {
      (async function() {
          const data = await fetchData()
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
            <CardTitle>Class Subjects</CardTitle>
            <CardDescription>
              A list of all the class subjects in your school.
            </CardDescription>
          </div>
          <Button onClick={() => router.push('/academic/class-subjects/new')}>
            <Icons.plus className='mr-2 size-4' />
            Add Class Subject
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={subjects} />
      </CardContent>
    </Card>
  );
};

export default ClassSubjectsPage;
