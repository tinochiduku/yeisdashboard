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
import { classes } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { toast } from 'sonner'

interface CellActionProps {
  data: InferSelectModel<typeof classes>;
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
            onClick={() => router.push(`/academic/classes/edit?classId=${data.id}`)}
          >
            <Icons.edit className='mr-2 h-4 w-4' /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            fetch(`/api/classes/${data.id}`, { method: 'DELETE' })
              .then(async (res) => {
              if (res.ok) {
                toast.success('Class deleted successfully');
                router.refresh()
              } else {
                const error = await res.text();
                toast.error(`Failed to delete class: ${error}`);
              }
              })
              .catch((err) => {
              toast.error(`Failed to delete class: ${err.message}`);
              });
          }}>
            <Icons.trash className='mr-2 h-4 w-4' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
