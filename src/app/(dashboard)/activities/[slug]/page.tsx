'use client';
import { Heading } from '@/components/ui/heading';
import ActivityParticipantsPage from '@/features/tables/activity-participants';
import CompetitionsPage from '@/features/tables/competitions';
import ExtracurricularPage from '@/features/tables/extracurricular';
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
    case 'extracurricular':
      return <ExtracurricularPage />;
    case 'participants':
      return <ActivityParticipantsPage />;
    case 'competitions':
      return <CompetitionsPage />;
    case 'competition-participants':
      return <ActivityParticipantsPage />;
    default:
      return null;
  }

}