'use client';
import { Heading } from '@/components/ui/heading';
import NonTeachingPage from '@/features/tables/non-teaching';
import StaffAttendancePage from '@/features/tables/staff-attendance';
import StaffPage from '@/features/tables/staff';
import TeachersPage from '@/features/tables/teachers';
import _sidebar from '@/utils/_sidebar';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import StaffForm from '@/features/tables/staff/form';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getData } from '@/utils/requests/dataQuery';

export default function DynamicPage() {
  const params = useParams();
  const { slug } = params;
  const pathname = usePathname()
  const searchParams = useSearchParams()

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

  const [initialData, setInitialData] = useState<any>([])

  const id = {
    staff: searchParams.get('staffId')
  }

     useEffect(() => {
      let isMounted = true;
      
      const fetchData = async () => {
          try {
            switch(pathname) {
              case '/staff/staff-list/edit':
                const _staff = await getData({ 
                  title: 'Fetch Staff', 
                  url: `/api/staff/${id.staff}` 
                });
                
                setInitialData({ staff: _staff})
                break;
              default: 
                break;
            }


          } catch (error) {
            toast.error(`Failed to fetch data: ${error}`);
          }

    };
  
      if (isMounted) {
        fetchData();
      }
    
    
      return () => { 
        isMounted = false; 
      };
    }, [pathname, id.staff])

  return (
    <div>
      <Heading
        title={getPageTitle()}
        description={`Manage ${getPageTitle()}`}
      />
      <DataTables pathname={pathname} id={id} initialData={initialData}  />
    </div>
  );
}


const DataTables = ({pathname, id, initialData }: any) => {

  switch (pathname) {
    case '/staff/staff-list':
      return <StaffPage />;
    case '/staff/staff-list/new':
      return <StaffForm pageTitle='Add New Staff' />;
    case '/staff/staff-list/edit':
      return <StaffForm pageTitle='Edit Staff' id={id.staff} initialData={initialData.staff} edit/>;

    case '/staff/teachers':
      return <TeachersPage />;
    case '/staff/non-teaching':
      return <NonTeachingPage />;
    case '/staff/staff-attendance':
      return <StaffAttendancePage />;
    default:
      return null;
  }

}