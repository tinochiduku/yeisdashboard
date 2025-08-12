import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';

export default function StudentDashboard() {
  return (
    <div>
      <Heading title='Student Dashboard' description='Your personal metrics' />
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Overall Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>A-</div>
            <p className='text-muted-foreground text-xs'>Current average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>95%</div>
            <p className='text-muted-foreground text-xs'>This semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Upcoming Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>3</div>
            <p className='text-muted-foreground text-xs'>Due this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Library Fines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$0.00</div>
            <p className='text-muted-foreground text-xs'>
              No outstanding fines
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
