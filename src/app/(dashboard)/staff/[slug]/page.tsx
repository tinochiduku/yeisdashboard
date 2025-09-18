'use client';
import { Heading } from '@/components/ui/heading';
import NonTeachingPage from '@/features/tables/non-teaching';
import StaffAttendancePage from '@/features/tables/staff-attendance';
import StaffPage from '@/features/tables/staff';
import TeachersPage from '@/features/tables/teachers';
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
    case 'staff-list':
      return <StaffPage />;
    case 'teachers':
      return <TeachersPage />;
    case 'non-teaching':
      return <NonTeachingPage />;
    case 'staff-attendance':
      return <StaffAttendancePage />;
    default:
      return null;
  }

}