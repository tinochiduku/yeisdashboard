'use client';
import { Heading } from '@/components/ui/heading';
import SchoolForm from '@/features/tables/schools/form';
import _sidebar from '@/utils/_sidebar';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DynamicPage() {
  const params = useParams();
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { slug } = params;
  const id = searchParams.get('id')

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

  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      // Replace with your actual fetch logic
      fetch(`/api/schools/${id}`)
        .then(res => res.json())
        .then(data => setInitialData(data))
        .catch(() => setInitialData(null));
    }
  }, [id]);

  return (
    <div>
      <Heading
        title={getPageTitle()}
        description={`Manage ${getPageTitle()}`}
      />
      <Pages id={id!} initialData={initialData} url={pathname} title={getPageTitle()} />
    </div>
  );
}

const Pages = ({ url, title, id, initialData }: { url: string, title: string, id: string, initialData: any }) => {

  switch (url) {
    case '/schools/new':
      return <SchoolForm pageTitle={title} />
    case '/schools/edit':
      return id && <SchoolForm id={id} initialData={initialData} pageTitle={title} edit />
    default:
      return null;
  }

}