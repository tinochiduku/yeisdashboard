'use client';
import { Heading } from '@/components/ui/heading';
import StudentsPage from '@/features/tables/students';
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

  return (
    <div>
      <Heading 
        title={getPageTitle()}
        description={`Manage ${getPageTitle()}`}
      />
      <StudentsPage />
    </div>
  );
}
