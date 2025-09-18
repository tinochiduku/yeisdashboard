'use client';
import { Heading } from '@/components/ui/heading';
import HostelAllocationsPage from '@/features/tables/hostel-allocations';
import HostelRoomsPage from '@/features/tables/hostel-rooms';
import HostelsPage from '@/features/tables/hostels';
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
    case 'hostels-list':
      return <HostelsPage />;
    case 'rooms':
      return <HostelRoomsPage />;
    case 'allocations':
      return <HostelAllocationsPage />;
    default:
      return null;
  }

}