'use client';
import { Heading } from '@/components/ui/heading';
import StaffLeavePage from '@/features/tables/staff-leave';
import StudentLeavePage from '@/features/tables/student-leave';
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
    case 'student-leave':
      return <StudentLeavePage />;
    case 'staff-leave':
      return <StaffLeavePage />;
    default:
      return null;
  }

}