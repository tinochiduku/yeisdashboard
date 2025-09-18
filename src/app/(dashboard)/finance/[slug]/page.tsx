'use client';
import { Heading } from '@/components/ui/heading';
import ExpenseCategoriesPage from '@/features/tables/expense-categories';
import ExpensesPage from '@/features/tables/expenses';
import FeePaymentsPage from '@/features/tables/fee-payments';
import FeeStructurePage from '@/features/tables/fee-structure';
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
    case 'fee-structure':
      return <FeeStructurePage />;
    case 'fee-payments':
      return <FeePaymentsPage />;
    case 'expenses':
      return <ExpensesPage />;
    case 'expense-categories':
      return <ExpenseCategoriesPage />;
    default:
      return null;
  }

}