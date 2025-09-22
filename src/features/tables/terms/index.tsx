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
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const TermsPage = () => {
  const router = useRouter()
  const [terms, setTerms] =useState([])

    useEffect(() => {
  
      let sub = false
  
      const fetchClasses = async () => {
        const res = await fetch(`/api/terms`, { cache: 'no-store' });
        if (!res.ok) {
          toast.error('Failed to Fetch Terms')
        }
        return res.json();
      }
  
      if (!sub) {
        (async function() {
            const data = await fetchClasses()
            setTerms(data)
        })()
      }
  
      return () => { sub = true}
    }, [])

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className=''>
            <CardTitle>Terms</CardTitle>
            <CardDescription>
              A list of all the terms in your school.
            </CardDescription>
          </div>
          <Button onClick={() => router.push('/academic/terms/new')}>
            <Icons.plus className='mr-2 size-4' />
            Add Term
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={terms} />
      </CardContent>
    </Card>
  );
};

export default TermsPage;
