'use client';
import { Heading } from '@/components/ui/heading';
import PayrollRecordsPage from '@/features/tables/payroll-records';
import PayrollStructurePage from '@/features/tables/payroll-structure';
import _sidebar from '@/utils/_sidebar';
import { useParams, usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

export default function DynamicPage() {
  const pathname = usePathname()
  const params = useParams();
  const { slug } = params;
  const id = useMemo(() => ({
    structure: ''
  }),[])

  const [initialData, setInitialData] = useState<any>(null)

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

  return (
    <div>
      <Heading
        title={getPageTitle()}
        description={`Manage ${getPageTitle()}`}
      />
      <DataTables id={id} initialData={initialData} url={pathname} />
    </div>
  );
}


const DataTables = ({id, url, initialData}: any) => {

  switch (url) {
    case '/finance/payroll/payroll-structure':
      return <PayrollStructurePage />;
    case '/finance/payroll/payroll-records':
      return <PayrollRecordsPage />;
    default:
      return null;
  }

}