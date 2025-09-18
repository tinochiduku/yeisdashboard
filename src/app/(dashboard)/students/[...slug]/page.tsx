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
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function DynamicPage() {
  const [initialData, setInitialData] = useState(null)
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
      return <StudentForm id={id.student} initialData={initialData.student} pageTitle='Edit Student' edit/>;
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