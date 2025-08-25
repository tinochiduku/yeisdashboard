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

const CompetitionParticipantsPage = () => {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className=''>
            <CardTitle>Competition Participants</CardTitle>
            <CardDescription>
              A list of all the competition participants in your school.
            </CardDescription>
          </div>
          <Button>
            <Icons.plus className='mr-2 size-4' />
            Add Competition Participant
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={[]} />
      </CardContent>
    </Card>
  );
};

export default CompetitionParticipantsPage;
