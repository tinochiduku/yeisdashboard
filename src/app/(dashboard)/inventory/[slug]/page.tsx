'use client';
import { Heading } from '@/components/ui/heading';
import InventoryCategoriesPage from '@/features/tables/inventory-categories';
import InventoryItemsPage from '@/features/tables/inventory-items';
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
    case 'inventory-categories':
      return <InventoryCategoriesPage />;
    case 'inventory-items':
      return <InventoryItemsPage />;
    default:
      return null;
  }

}