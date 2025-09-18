'use client';
import { Heading } from '@/components/ui/heading';
import PayrollRecordsPage from '@/features/tables/payroll-records';
import PayrollStructurePage from '@/features/tables/payroll-structure';
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
        for (const grandChild of child.children) {
          if (grandChild.slug === slug) {
            return grandChild.title;
          }
        }
      }
    }
    return 'Page';
  };

  const getPageSlug = () => {
    for (const section of _sidebar) {
      for (const child of section.children) {
        for (const grandChild of child.children) {
          if (grandChild.slug === slug) {
            return grandChild.slug;
          }
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
    case 'payroll-structure':
      return <PayrollStructurePage />;
    case 'payroll-records':
      return <PayrollRecordsPage />;
    default:
      return null;
  }

}