import { getData } from '@/utils/requests/dataQuery';
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';

// Define the shape of the data returned by the hook
interface ApiData {
  users: any[];
  schools: any[];
  classes: any[];
  academicYears: any[];
  communications: any[];
  fileStorage: any[];
  notifications: any[];
  teachers: any[];
  activities: any[];
  competitionParticipants: any[];
  grades: any[];
  parents: any[];
  terms: any[];
  activityParticipants: any[];
  competitions: any[];
  hostelAllocations: any[];
  payrollRecords: any[];
  timetables: any[];
  announcements: any[];
  disciplinaryRecords: any[];
  hostelRooms: any[];
  payrollStructures: any[];
  transportAllocations: any[];
  attendanceRecords: any[];
  doc: any[];
  hostels: any[];
  purchaseOrders: any[];
  transportRoutes: any[];
  attendances: any[];
  events: any[];
  inventoryCategories: any[];
  transportVehicles: any[];
  auditLogs: any[];
  examSubjects: any[];
  inventoryItems: any[];
  leaves: any[];
  staff: any[];
  vendors: any[];
  cafeteriaMenus: any[];
  exams: any[];
  libraryBooks: any[];
  studentParents: any[];
  visitors: any[];
  cafeteriaOrders: any[];
  expenseCategories: any[];
  libraryIssues: any[];
  students: any[];
  certificates: any[];
  expenses: any[];
  maintenanceRequests: any[];
  subjects: any[];
  classSubjects: any[];
  feePayments: any[];
  medicalRecords: any[];
  systemSettings: any[];
  feeStructures: any[];
  siblings: any[];
}

interface UseApiDataOptions {
  endpoints?: string[]; // Specific endpoints to fetch (if not all)
  enabled?: boolean; // Whether to fetch data immediately
}


export const useApiData = (options: UseApiDataOptions = {}) => {
  const { endpoints, enabled = true } = options;
  
  const [data, setData] = useState<Partial<ApiData>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);



  const allEndpoints = useMemo(() => ({
    users: '/api/users',
    schools: '/api/schools',
    classes: '/api/classes',
    academicYears: '/api/academic-years',
    communications: '/api/communications',
    fileStorage: '/api/file-storage',
    notifications: '/api/notifications',
    teachers: '/api/teachers',
    activities: '/api/activities',
    competitionParticipants: '/api/competition-participants',
    grades: '/api/grades',
    parents: '/api/parents',
    terms: '/api/terms',
    activityParticipants: '/api/activity-participants',
    competitions: '/api/competitions',
    hostelAllocations: '/api/hostel-allocations',
    payrollRecords: '/api/payroll-records',
    timetables: '/api/timetables',
    announcements: '/api/announcements',
    disciplinaryRecords: '/api/disciplinary-records',
    hostelRooms: '/api/hostel-rooms',
    payrollStructures: '/api/payroll-structures',
    transportAllocations: '/api/transport-allocations',
    attendanceRecords: '/api/attendance-records',
    doc: '/api/doc',
    hostels: '/api/hostels',
    purchaseOrders: '/api/purchase-orders',
    transportRoutes: '/api/transport-routes',
    attendances: '/api/attendances',
    events: '/api/events',
    inventoryCategories: '/api/inventory-categories',
    transportVehicles: '/api/transport-vehicles',
    auditLogs: '/api/audit-logs',
    examSubjects: '/api/exam-subjects',
    inventoryItems: '/api/inventory-items',
    leaves: '/api/leaves',
    staff: '/api/staff',
    vendors: '/api/vendors',
    cafeteriaMenus: '/api/cafeteria-menus',
    exams: '/api/exams',
    libraryBooks: '/api/library-books',
    studentParents: '/api/student-parents',
    visitors: '/api/visitors',
    cafeteriaOrders: '/api/cafeteria-orders',
    expenseCategories: '/api/expense-categories',
    libraryIssues: '/api/library-issues',
    students: '/api/students',
    certificates: '/api/certificates',
    expenses: '/api/expenses',
    maintenanceRequests: '/api/maintenance-requests',
    subjects: '/api/subjects',
    classSubjects: '/api/class-subjects',
    feePayments: '/api/fee-payments',
    medicalRecords: '/api/medical-records',
    systemSettings: '/api/system-settings',
    feeStructures: '/api/fee-structures',
    siblings: '/api/siblings',
  }), []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!enabled) return;
      
      setIsLoading(true);
      setError(null);

      try {
        // Determine which endpoints to fetch
        const endpointsToFetch = endpoints 
          ? endpoints.reduce((acc, endpoint) => {
              if (allEndpoints[endpoint as keyof typeof allEndpoints]) {
                acc[endpoint] = allEndpoints[endpoint as keyof typeof allEndpoints];
              }
              return acc;
            }, {} as Record<string, string>)
          : allEndpoints;

        // Fetch data for all selected endpoints
        const fetchPromises = Object.entries(endpointsToFetch).map(
          async ([key, url]) => {
            const title = `Fetch ${key.charAt(0).toUpperCase() + key.slice(1)}`;
            const result = await getData({ title, url });
            return { key, data: result };
          }
        );

        const results = await Promise.all(fetchPromises);
        
        if (isMounted) {
          const newData = results.reduce((acc, { key, data }) => {
            acc[key as keyof ApiData] = data;
            return acc;
          }, {} as Partial<ApiData>);

          setData(newData);
        }
      } catch (error) {
        if (isMounted) {
          const errorMessage = `Failed to fetch data: ${error}`;
          setError(errorMessage);
          toast.error(errorMessage);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (isMounted) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const refetch = async () => {
    const isMounted = true;
    setIsLoading(true);
    setError(null);

    try {
      const endpointsToFetch = endpoints 
        ? endpoints.reduce((acc, endpoint) => {
            if (allEndpoints[endpoint as keyof typeof allEndpoints]) {
              acc[endpoint] = allEndpoints[endpoint as keyof typeof allEndpoints];
            }
            return acc;
          }, {} as Record<string, string>)
        : allEndpoints;

      const fetchPromises = Object.entries(endpointsToFetch).map(
        async ([key, url]) => {
          const title = `Fetch ${key.charAt(0).toUpperCase() + key.slice(1)}`;
          const result = await getData({ title, url });
          return { key, data: result };
        }
      );

      const results = await Promise.all(fetchPromises);
      
      if (isMounted) {
        const newData = results.reduce((acc, { key, data }) => {
          acc[key as keyof ApiData] = data;
          return acc;
        }, {} as Partial<ApiData>);

        setData(newData);
      }
    } catch (error) {
      if (isMounted) {
        const errorMessage = `Failed to refetch data: ${error}`;
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }
  };

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

// Usage examples:

// 1. Fetch all data
// const { data, isLoading, error } = useApiData();

// 2. Fetch specific endpoints only
// const { data, isLoading, error } = useApiData({
//   endpoints: ['users', 'schools', 'classes']
// });

// 3. Lazy fetch (don't fetch immediately)
// const { data, isLoading, error, refetch } = useApiData({ enabled: false });
// Then call refetch() when needed