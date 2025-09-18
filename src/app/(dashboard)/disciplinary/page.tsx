import { Heading } from '@/components/ui/heading';
import DisciplinaryRecordsPage from '@/features/tables/disciplinary-records';

export default function DisciplinaryPage() {
  return (
    <div>
      <Heading title='Disciplinary' description='Manage disciplinary records' />
      <DisciplinaryRecordsPage />
    </div>
  );
}