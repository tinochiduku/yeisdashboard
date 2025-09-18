'use client';
import { Heading } from '@/components/ui/heading';
import TransportAllocationsPage from '@/features/tables/transport-allocations';
import TransportRoutesPage from '@/features/tables/transport-routes';
import TransportVehiclesPage from '@/features/tables/transport-vehicles';
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
    case 'routes':
      return <TransportRoutesPage />;
    case 'vehicles':
      return <TransportVehiclesPage />;
    case 'transport-allocations':
      return <TransportAllocationsPage />;
    default:
      return null;
  }

}