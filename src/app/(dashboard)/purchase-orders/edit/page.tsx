'use client'
import { Heading } from '@/components/ui/heading';
import PurchaseOrderForm from '@/features/tables/purchase-orders/form';
import VendorForm from '@/features/tables/vendors/form';
import { useDataFetcher } from '@/hooks/use-datafetcher';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';


export default function Page() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [initialData, setInitialData] = useState<any>(null)
  const id = useMemo(() => ({
    vendor: searchParams.get('vendorId') || ''
  }), [])

  const { fetchData } = useDataFetcher({
    routeConfigs: [
      {
        path: '/vendors/edit',
        idKey: 'vendor',
        dataKey: 'vendor',
        title: 'Fetch Vendor',
        apiPath: '/api/vendors'
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
      <Heading title='Purchase Orders' description='Manage Purchase Orders' />
      <PurchaseOrderForm pageTitle='Edit Order'  id={id.vendor} initialData={initialData?.vendor} edit/>
    </div>
  );
}