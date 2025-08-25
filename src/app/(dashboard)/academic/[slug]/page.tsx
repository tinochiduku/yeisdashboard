'use client';
import { Heading } from '@/components/ui/heading';
import AcademicYearsPage from '@/features/tables/academic-years';
import ClassSubjectsPage from '@/features/tables/class-subjects';
import ClassesPage from '@/features/tables/classes';
import SubjectsPage from '@/features/tables/subjects';
import TermsPage from '@/features/tables/terms';
import TimetablePage from '@/features/tables/timetable';
import _sidebar from '@/utils/_sidebar';
import { useParams } from 'next/navigation';

export default function DynamicPage() {
  const params = useParams();
  const { slug } = params;

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

  const getPageSlug = () => {
    for (const section of _sidebar) {
      for (const child of section.children) {
        if (child.slug === slug) {
          return child.slug;
        }
      }
    }
    return '/';
  };

  return (
    <div>
      <Heading
        title={getPageTitle()}
        description={`Manage ${getPageTitle()}`}
      />
      <DataTables data={getPageSlug()} />
    </div>
  );
}


const DataTables = ({data}: any) => {

  switch (data) {
    case 'classes':
      return <ClassesPage />;
    case 'subjects':
      return <SubjectsPage />;
    case 'years':
      return <AcademicYearsPage />;
    case 'terms':
      return <TermsPage />;
    case 'timetable':
      return <TimetablePage />;
    case 'class-subjects':
      return <ClassSubjectsPage />;
    default:
      return null;
  }

}