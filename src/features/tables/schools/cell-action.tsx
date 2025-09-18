'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { schools } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { toast } from 'sonner';

interface CellActionProps {
  data: InferSelectModel<typeof schools>;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <Icons.moreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/schools/edit?id=${data.id}`)}
          >
            <Icons.edit className='mr-2 h-4 w-4' /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            const handleDelete = async () => {
              try {
                const res = await fetch(`/api/schools/${data.id}`, { method: 'DELETE' });
                if (res.ok) {
                  toast.success('School deleted successfully');
                  router.refresh();
                } else {
                  toast.error('Failed to delete school');
                }
              } catch (error) {
                toast.error('An error occurred while deleting');
              }
            };

            handleDelete();
          }}>
            <Icons.trash className='mr-2 h-4 w-4' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
