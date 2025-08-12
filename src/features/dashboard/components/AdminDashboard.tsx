import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';

export default function AdminDashboard() {
  return (
    <div>
      <Heading title='Admin Dashboard' description='System-wide overview' />
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>System Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>99.9%</div>
            <p className='text-muted-foreground text-xs'>Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>1,234</div>
            <p className='text-muted-foreground text-xs'>+50 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Server Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>Healthy</div>
            <p className='text-muted-foreground text-xs'>
              All systems operational
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>API Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>Online</div>
            <p className='text-muted-foreground text-xs'>No reported issues</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
