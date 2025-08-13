'use client';
import { useUser } from '@clerk/nextjs';
import AdminDashboard from '@/features/dashboard/components/AdminDashboard';
import StaffDashboard from '@/features/dashboard/components/StaffDashboard';
import StudentDashboard from '@/features/dashboard/components/StudentDashboard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Dashboard() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <Skeleton className='h-screen w-full' />;
  }

  // const role = user?.publicMetadata?.role;

  const role = 'student';

  if (role === 'admin') {
    return <AdminDashboard />;
  }

  if (role === 'staff') {
    return <StaffDashboard />;
  }

  if (role === 'student') {
    return <StudentDashboard />;
  }

  return (
    <div>
      <p>You do not have a role assigned. Please contact an administrator.</p>
    </div>
  );
}
