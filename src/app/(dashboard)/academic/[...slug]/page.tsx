'use client';
import { Heading } from '@/components/ui/heading';
import AcademicYearsPage from '@/features/tables/academic-years';
import ClassSubjectsPage from '@/features/tables/class-subjects';
import ClassesPage from '@/features/tables/classes';
import ClassForm from '@/features/tables/classes/form';
import SubjectsPage from '@/features/tables/subjects';
import TermsPage from '@/features/tables/terms';
import TimetablePage from '@/features/tables/timetable';
import _sidebar from '@/utils/_sidebar';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DynamicPage() {
  const params = useParams();
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { slug } = params;

  const anyParams = searchParams.size

  const [initialData, setInitialData] = useState<any>(null)

  const id = {
    class: searchParams.get('classId'),
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
    if (anyParams > 0) {
      // Replace with your actual fetch logic
      fetch(`/api/classes/${id.class}`)
        .then(res => res.json())
        .then(data => setInitialData({class: data}))
        .catch(() => setInitialData(null));
    }
  }, [id.class, anyParams]);

  return (
    <div>
      <Heading
        title={getPageTitle()}
        description={`Manage ${getPageTitle()}`}
      />
      <DataTables id={id} title={getPageTitle()} url={pathname} initialData={initialData} />
    </div>
  );
}


const DataTables = ({ id, title, url, initialData }: any) => {

  switch (url) {
    case '/academic/classes':
      return <ClassesPage />;
    case '/academic/classes/new':
      return <ClassForm pageTitle='Add New Class' />;
    case '/academic/classes/edit':
      return <ClassForm id={id.class} pageTitle='Edit Class' initialData={initialData?.class} edit/>;
    case '/academic/subjects':
      return <SubjectsPage />;
    case '/academic/years':
      return <AcademicYearsPage />;
    case '/academic/terms':
      return <TermsPage />;
    case '/academic/timetable':
      return <TimetablePage />;
    case '/academic/class-subjects':
      return <ClassSubjectsPage />;
    default:
      return null;
  }

}