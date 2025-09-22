'use client';
import { Heading } from '@/components/ui/heading';
import AdmissionsPage from '@/features/tables/admissions';
import AttendancePage from '@/features/tables/attendance';
import ParentsPage from '@/features/tables/parents';
import SiblingsPage from '@/features/tables/siblings';
import StudentParentsPage from '@/features/tables/student-parents';
import StudentsPage from '@/features/tables/students';
import StudentForm from '@/features/tables/students/form';
import _sidebar from '@/utils/_sidebar';
import { getData } from '@/utils/requests/dataQuery';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function DynamicPage() {
  const [initialData, setInitialData] = useState<any>(null)
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { slug } = params;

  const id = {
    student: searchParams.get('studentId')
  }

  const getPageTitle = () => {
    for (const section of _sidebar) {
      for (const child of section.children) {
        if (child.slug === slug) {
          return child.title;
        }
      }
    }
    return 'Page';
  };

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
        try {
          switch(pathname) {
            case '/students/edit':
              const _student = await getData({ 
                title: 'Fetch Student', 
                url: `/api/students/${id.student}` 
              });
              setInitialData({ student: _student})
              break;
            default: 
              break;
          }


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
  }, [pathname, id.student])

  return (
    <div>
      <Heading
        title={getPageTitle()}
        description={`Manage ${getPageTitle()}`}
      />
      <DataTables id={id} url={pathname} initialData={initialData}  />
    </div>
  );
}


const DataTables = ({id, url, initialData}: any) => {

  switch (url) {
    case '/students/new':
      return <StudentForm pageTitle='Add New Student' />; 
    case '/students/edit':
      return <StudentForm id={id.student} initialData={initialData?.student} pageTitle='Edit Student' edit/>;
    
    case '/students/admissions':
      return <AdmissionsPage />;
    case '/students/attendance':
      return <AttendancePage />;
    case '/students/parents':
      return <ParentsPage />;
    case '/students/student-parents':
      return <StudentParentsPage />;
    case '/students/siblings':
      return <SiblingsPage />;
    default:
      return null;
  }

}