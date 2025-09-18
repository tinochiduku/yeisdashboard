'use client';
import { Heading } from '@/components/ui/heading';
import ExamSubjectsPage from '@/features/tables/exam-subjects';
import ExamsPage from '@/features/tables/exams';
import GradesPage from '@/features/tables/grades';
import ResultsPage from '@/features/tables/results';
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
    case 'exams':
      return <ExamsPage />;
    case 'exam-subjects':
      return <ExamSubjectsPage />;
    case 'grades':
      return <GradesPage />;
    case 'results':
      return <ResultsPage />;
    default:
      return null;
  }

}