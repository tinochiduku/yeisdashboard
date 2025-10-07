'use client';
import { Heading } from '@/components/ui/heading';
import AdmissionsPage from '@/features/tables/admissions';
import AttendancePage from '@/features/tables/attendance';
import ParentsPage from '@/features/tables/parents';
import ParentForm from '@/features/tables/parents/form';
import StudentForm from '@/features/tables/students/form';
import { useDataFetcher } from '@/hooks/use-datafetcher';
import _sidebar from '@/utils/_sidebar';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

export default function DynamicPage() {
  const [initialData, setInitialData] = useState<any>(null)
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { slug } = params;

  const id = useMemo(() => ({
    student: searchParams.get('studentId'),
    parent: searchParams.get('parentId')
  }), [searchParams]);

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

  const { fetchData } = useDataFetcher({
    routeConfigs: [
      {
        path: '/students/edit',
        idKey: 'student',
        dataKey: 'student',
        title: 'Fetch Student',
        apiPath: '/api/students'
      },
      {
        path: '/parents/edit',
        idKey: 'parent',
        dataKey: 'parent',
        title: 'Fetch Parent',
        apiPath: '/api/parents'
      }
    ],
    defaultErrorHandler: (error: any) => toast.error(`Failed to fetch: ${error}`)
  });

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchData(pathname, id, setInitialData)
    }
  
    return () => { 
      isMounted = false; 
    };
  }, [])

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
    case '/students/parents/new':
      return <ParentForm pageTitle='Add Parent'/>;
    case '/students/parents/edit':
      return <ParentForm pageTitle='Edit Parent' id={id.parent} initialData={initialData?.parent} edit/>;

    default:
      return null;
  }

}