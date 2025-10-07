'use client';
import { Heading } from '@/components/ui/heading';
import ExamSubjectsPage from '@/features/tables/exam-subjects';
import ExamSubjectForm from '@/features/tables/exam-subjects/form';
import ExamsPage from '@/features/tables/exams';
import ExamForm from '@/features/tables/exams/form';
import GradesPage from '@/features/tables/grades';
import GradeForm from '@/features/tables/grades/form';
import ResultsPage from '@/features/tables/results';
import { useDataFetcher } from '@/hooks/use-datafetcher';
import _sidebar from '@/utils/_sidebar';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

export default function DynamicPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { slug } = params;
  const [initialData, setInitialData ] = useState<any>(null)
  const pathname = usePathname()
  const id = useMemo(() => ({
    exam: searchParams.get('examId'),
    examSubject: searchParams.get('examSubjectId'),
    grade: searchParams.get('gradeId')
  }
  ), [searchParams])


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
        path: '/examinations/exams/edit',
        idKey: 'exam',
        dataKey: 'exam',
        title: 'Fetch Exam',
        apiPath: '/api/exams'
      },
      {
        path: '/examinations/exam-subjects/edit',
        idKey: 'examSubject',
        dataKey: 'examSubject',
        title: 'Fetch Exam Subject',
        apiPath: '/api/exam-subjects'
      },
      {
        path: '/examinations/grades/edit',
        idKey: 'grade',
        dataKey: 'grade',
        title: 'Fetch Grade',
        apiPath: '/api/grades'
      },
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


const DataTables = ({ id, url, initialData }: any) => {

  switch (url) {
    case '/examinations/exams':
      return <ExamsPage />;
    case '/examinations/exams/new':
      return <ExamForm pageTitle='New Exam' />
    case '/examinations/exams/edit':
      return <ExamForm pageTitle='Edit Exam' id={id.exam} initialData={initialData?.exam} edit/>

      
    case '/examinations/exam-subjects':
      return <ExamSubjectsPage />;
    case '/examinations/exam-subjects/new':
      return <ExamSubjectForm pageTitle='Add Exam Subject' />;
    case '/examinations/exam-subjects/edit':
      return <ExamSubjectForm pageTitle='Edit Exam Subject' id={id.examSubject} initialData={initialData?.examSubject} edit />;


    case '/examinations/grades':
      return <GradesPage />;
    case '/examinations/grades/new':
      return <GradeForm pageTitle='Add Grading' />;
    case '/examinations/grades/edit':
      return <GradeForm pageTitle='Edit Grade' id={id.grade} initialData={initialData?.grade} edit />;


    case '/examinations/results':
      return <ResultsPage />;
    default:
      return null;
  }

}