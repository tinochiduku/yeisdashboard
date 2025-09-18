'use client';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { DataTable } from './data-table';
import { columns } from './columns';
import Link from 'next/link';

const SchoolsPage = ({data = []}: any) => {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className=''>
            <CardTitle>Schools</CardTitle>
            <CardDescription>
              A list of all the schools in your system.
            </CardDescription>
          </div>
          <Link href="/schools/new">
            <Button>
              <Icons.plus className='mr-2 size-4' />
              Add School
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
};

export default SchoolsPage;
