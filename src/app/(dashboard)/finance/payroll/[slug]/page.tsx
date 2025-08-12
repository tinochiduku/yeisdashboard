'use client';
import { Heading } from '@/components/ui/heading';
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
        for (const grandChild of child.children) {
          if (grandChild.slug === slug) {
            return grandChild.title;
          }
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
    </div>
  );
}
