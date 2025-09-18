'use client';
import { Heading } from '@/components/ui/heading';
import AnnouncementsPage from '@/features/tables/announcements';
import ContactsPage from '@/features/tables/contacts';
import MessagesPage from '@/features/tables/messages';
import NewsletterPage from '@/features/tables/newsletter';
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
    case 'contacts':
      return <ContactsPage />;
    case 'newsletter':
      return <NewsletterPage />;
    case 'messages':
      return <MessagesPage />;
    case 'announcements':
      return <AnnouncementsPage />;
    default:
      return null;
  }

}