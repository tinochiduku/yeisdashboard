'use client';
import { Heading } from '@/components/ui/heading';
import AcademicYearsPage from '@/features/tables/academic-years';
import AcademicYearForm from '@/features/tables/academic-years/form';
import ClassSubjectsPage from '@/features/tables/class-subjects';
import ClassSubjectForm from '@/features/tables/class-subjects/form';
import ClassesPage from '@/features/tables/classes';
import ClassForm from '@/features/tables/classes/form';
import SubjectsPage from '@/features/tables/subjects';
import SubjectForm from '@/features/tables/subjects/form';
import TermsPage from '@/features/tables/terms';
import TermForm from '@/features/tables/terms/form';
import TimetablePage from '@/features/tables/timetable';
import TimetableForm from '@/features/tables/timetable/form';
import _sidebar from '@/utils/_sidebar';
import { getData } from '@/utils/requests/dataQuery';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function DynamicPage() {
  const params = useParams();
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { slug } = params;

  const [initialData, setInitialData] = useState<any>(null)

  const id = {
    class: searchParams.get('classId'),
    year: searchParams.get('yearId'),
    term: searchParams.get('termId'),
    timetable: searchParams.get('timetable'),
    classSubject: searchParams.get('classSubject'),
    subject: searchParams.get('subjectId'),
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
        case '/academic/classes/edit':
          try {
            if (id.class) {
              const data = await getData({ 
                title: 'Fetch Classes', 
                url: `/api/classes/${id.class}` 
              });
  
              setInitialData({ class: data });
            }
          } catch (error) {
            toast.error(`Failed to fetch class data: ${error}`);
          }
          break;
        
        case '/academic/years/edit':
          try {
            if (id.year) {
              const data = await getData({ 
                title: 'Fetch Academic Years', 
                url: `/api/academic-years/${id.year}` 
              });
  
              setInitialData({ year: data });
            }
          } catch (error) {
            toast.error(`Failed to fetch class data: ${error}`);
          }
          break;
        
        case '/academic/terms/edit':
          try {
            if (id.term) {
              const data = await getData({ 
                title: 'Fetch Term', 
                url: `/api/terms/${id.term}` 
              });
  
              setInitialData({ term: data });
            }
          } catch (error) {
            toast.error(`Failed to fetch class data: ${error}`);
          }
          break;
        
        case '/academic/timetable/edit':
          try {
            if (id.timetable) {
              const data = await getData({ 
                title: 'Fetch Timetable', 
                url: `/api/timetables/${id.timetable}` 
              });
  
              setInitialData({ timetable: data });
            }
          } catch (error) {
            toast.error(`Failed to fetch class data: ${error}`);
          }
          break;
        
        case '/academic/class-subjects/edit':
          try {
            if (id.classSubject) {
              const data = await getData({ 
                title: 'Fetch Class Subject', 
                url: `/api/class-subjects/${id.classSubject}` 
              });
  
              setInitialData({ classSubject: data });
            }
          } catch (error) {
            toast.error(`Failed to fetch class data: ${error}`);
          }
          break;
        
        case '/academic/subjects/edit':
          try {
            if (id.subject) {
              const data = await getData({ 
                title: 'Fetch Subject', 
                url: `/api/subjects/${id.subject}` 
              });
  
              setInitialData({ subject: data });
            }
          } catch (error) {
            toast.error(`Failed to fetch class data: ${error}`);
          }
          break;
        
        default:
          // toast.info("There's No Data")
          break;
      }
    };

    if (isMounted) {
      fetchData();
    }
  
    return () => { 
      isMounted = false; 
    };
  }, [pathname, id.class, id.year, id.term, id.timetable, id.classSubject, id.subject])

  console.log(initialData)

  return (
    <div>
      <Heading
        title={getPageTitle()}
        description={`Manage ${getPageTitle()}`}
      />
      <DataTables id={id} title={getPageTitle()} url={pathname} initialData={initialData} />
    </div>
  );
}


const DataTables = ({ id, url, initialData }: any) => {

  switch (url) {
    case '/academic/classes':
      return <ClassesPage />;
    case '/academic/classes/new':
      return <ClassForm pageTitle='Add New Class' />;
    case '/academic/classes/edit':
      return <ClassForm id={id.class} pageTitle='Edit Class' initialData={initialData?.class} edit/>;

    case '/academic/subjects':
      return <SubjectsPage />;
    case '/academic/subjects/new':
      return <SubjectForm pageTitle='New Subject'/>;
    case '/academic/subjects/edit':
      return <SubjectForm pageTitle='Edit Subject' id={id.subject} initialData={initialData?.subject} edit />;

    case '/academic/years':
      return <AcademicYearsPage />;
    case '/academic/years/new':
      return <AcademicYearForm pageTitle='Add Academic Year' />;
    case '/academic/years/edit':
      return <AcademicYearForm pageTitle='Edit Academic Year' id={id.year} initialData={initialData?.year} edit />;

    case '/academic/terms':
      return <TermsPage />;
    case '/academic/terms/new':
      return <TermForm pageTitle='Add Term' />;
    case '/academic/terms/edit':
      return <TermForm pageTitle='Edit Term' id={id.term} initialData={initialData?.term} edit />;

    case '/academic/timetable':
      return <TimetablePage />;
    case '/academic/timetable/new':
      return <TimetableForm pageTitle='Add Timetable Entry' />;
    case '/academic/timetable/edit':
      return <TimetableForm pageTitle='Edit Timetable Entry' id={id.timetable} initialData={initialData?.timetable} edit />;

    case '/academic/class-subjects':
      return <ClassSubjectsPage />;
    case '/academic/class-subjects/new':
      return <ClassSubjectForm pageTitle='Add Class Subject' />;
    case '/academic/class-subjects/edit':
      return <ClassSubjectForm pageTitle='Edit Class Subject' id={id.classSubject} initialData={initialData?.classSubject} edit />;

    default:
      return null;
  }

}