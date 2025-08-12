import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';

export default function StaffDashboard() {
  return (
    <div>
      <Heading title='Staff Dashboard' description='Departmental metrics' />
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>Academics</div>
            <p className='text-muted-foreground text-xs'>
              Your assigned department
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Upcoming Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>5</div>
            <p className='text-muted-foreground text-xs'>
              In the next 24 hours
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Pending Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>12</div>
            <p className='text-muted-foreground text-xs'>To be graded</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Student Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>98%</div>
            <p className='text-muted-foreground text-xs'>
              For your classes today
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
