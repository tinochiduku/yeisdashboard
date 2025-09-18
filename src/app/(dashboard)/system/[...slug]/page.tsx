'use client';
import { Heading } from '@/components/ui/heading';
import AuditLogsPage from '@/features/tables/audit-logs';
import FileStoragePage from '@/features/tables/file-storage';
import NotificationsPage from '@/features/tables/notifications';
import SystemSettingsPage from '@/features/tables/system-settings';
import UsersPage from '@/features/tables/users';
import UserForm from '@/features/tables/users/form';
import _sidebar from '@/utils/_sidebar';
import { getData } from '@/utils/requests/dataQuery';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function DynamicPage() {
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { slug } = params;
  const [initialData, setInitialData] = useState<any>(null)

  const id = {
    user: searchParams.get('userId')
  }

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

useEffect(() => {
  let isMounted = true;
  
  const fetchData = async () => {
    switch(pathname) {
      case '/system/users/edit':
        try {
          if (id.user) {
            const data = await getData({ 
              title: 'Fetch Users', 
              url: `/api/users` 
            });

            const user_data = data.filter((user: any) => user.id === id.user)[0]

            setInitialData({ user: user_data });
          }
        } catch (error) {
          toast.error(`Failed to fetch user data: ${error}`);
        }
        break;
      
      // case '/system/users/create':
      //   // Example of another case
      //   if (isMounted) {
      //     setInitialData({ user: null }); // Reset for create form
      //   }
      //   break;
      
      // case '/system/roles/edit':
      //   // Example: fetch role data
      //   try {
      //     const data = await getData({ 
      //       title: 'Fetch Role', 
      //       url: `/api/roles/${id.role}` 
      //     });
      //     if (isMounted) {
      //       setInitialData({ role: data });
      //     }
      //   } catch (error) {
      //     console.error('Failed to fetch role data:', error);
      //   }
      //   break;
      
      default:
        // Handle other routes or do nothing
        break;
    }
  };

  fetchData();

  return () => { 
    isMounted = false; 
  };
}, [pathname, id.user])

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


const DataTables = ({id, url, initialData}: any) => {

  switch (url) {
    case '/system/settings':
      return <SystemSettingsPage />;
    case '/system/users':
      return <UsersPage />;
    case '/system/users/edit':
      return <UserForm id={id?.user} pageTitle='Edit User' initialData={initialData?.user} edit/>;
    case '/system/audit-logs':
      return <AuditLogsPage />;
    case '/system/notifications':
      return <NotificationsPage />;
    case '/system/file-storage':
      return <FileStoragePage />;
    default:
      return null;
  }

}