'use client';
import { Heading } from '@/components/ui/heading';
import ExpenseCategoriesPage from '@/features/tables/expense-categories';
import ExpenseCategoryForm from '@/features/tables/expense-categories/form';
import ExpensesPage from '@/features/tables/expenses';
import ExpenseForm from '@/features/tables/expenses/form';
import FeePaymentsPage from '@/features/tables/fee-payments';
import FeePaymentForm from '@/features/tables/fee-payments/form';
import FeeStructurePage from '@/features/tables/fee-structure';
import FeeStructureForm from '@/features/tables/fee-structure/form';
import { useDataFetcher } from '@/hooks/use-datafetcher';
import _sidebar from '@/utils/_sidebar';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

export default function DynamicPage() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = useParams();
  const { slug } = params;
  const [initialData, setInitialData] = useState()
  const id = useMemo(() => ({
    expenseCategory: searchParams.get('expenseCategoryId'),
    expense: searchParams.get('expenseId'),
    feePayment: searchParams.get('feePaymentId'),
    feeStructure: searchParams.get('feeStructureId'),
  }), [searchParams])

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

  const { fetchData } = useDataFetcher({
    routeConfigs: [
      {
        path: '/finance/expense-categories/edit',
        idKey: 'expenseCategory',
        dataKey: 'expenseCategory',
        title: 'Fetch Expense Category',
        apiPath: '/api/expense-categories'
      },
      {
        path: '/finance/expenses/edit',
        idKey: 'expense',
        dataKey: 'expense',
        title: 'Fetch Expense',
        apiPath: '/api/expenses'
      },
      {
        path: '/finance/fee-payments/edit',
        idKey: 'feePayment',
        dataKey: 'feePayment',
        title: 'Fetch Fee Payment',
        apiPath: '/api/fee-payments'
      },
      {
        path: '/finance/fee-structure/edit',
        idKey: 'feeStructure',
        dataKey: 'feeStructure',
        title: 'Fetch Fee Structure',
        apiPath: '/api/fee-structures'
      }
    ],
    defaultErrorHandler: (error: any) => toast.error(`Failed to fetch: ${error}`)
  });

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchData(pathname, id, setInitialData)
    }
  
    return () => { 
      isMounted = false; 
    };
  }, [])


  return (
    <div>
      <Heading
        title={getPageTitle()}
        description={`Manage ${getPageTitle()}`}
      />
      <DataTables id={id} url={pathname} initialData={initialData} />
    </div>
  );
}


const DataTables = ({ id , url, initialData }: any) => {

  switch (url) {
    case '/finance/fee-structure':
      return <FeeStructurePage />;
    case '/finance/fee-structure/new':
      return <FeeStructureForm pageTitle='Add Fee Structure' />;
    case '/finance/fee-structure/edit':
      return <FeeStructureForm pageTitle='Edit Fee Structure' id={id.feeStructure} initialData={initialData?.feeStructure} edit/>;

    case '/finance/fee-payments':
      return <FeePaymentsPage />;
    case '/finance/fee-payments/new':
      return <FeePaymentForm pageTitle='Add Fee Payment' />;
    case '/finance/fee-payments/edit':
      return <FeePaymentForm pageTitle='Edit Fee Payment' id={id.feePayment} initialData={initialData?.feePayment} edit/>;

    case '/finance/expenses':
      return <ExpensesPage />;
    case '/finance/expenses/new':
      return <ExpenseForm pageTitle='Add Expense' />;
    case '/finance/expenses/edit':
      return <ExpenseForm pageTitle='Edit Expense' id={id.expense} initialData={initialData?.expense} edit/>;

    case '/finance/expense-categories':
      return <ExpenseCategoriesPage />;
    case '/finance/expense-categories/new':
      return <ExpenseCategoryForm pageTitle='Add Expense Category' />;
    case '/finance/expense-categories/edit':
      return <ExpenseCategoryForm pageTitle='Edit Expense Category' id={id.expenseCategory} initialData={initialData?.expenseCategory} edit/>;

    default:
      return null;
  }

}