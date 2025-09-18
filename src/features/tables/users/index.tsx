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
import { useEffect, useState } from 'react';
import { getData } from '@/utils/requests/dataQuery';

const UsersPage = () => {

  const [ users, setUsers ] = useState([])

  useEffect(() => {
    let sub = false
    
    if (!sub) { 
      (async function() {
        const data = await getData({title: 'Fetch Users', url: '/api/users'})
        setUsers(data)
      })()
    }

    return () => { sub = true }
  }, [])

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className=''>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              A list of all the users in your system.
            </CardDescription>
          </div>
          <Button>
            <Icons.plus className='mr-2 size-4' />
            Add User
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={users} />
      </CardContent>
    </Card>
  );
};

export default UsersPage;
