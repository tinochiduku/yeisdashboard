import { Heading } from '@/components/ui/heading';
import VisitorsPage from '@/features/tables/visitors';

export default function Visitors() {
  return (
    <div>
      <Heading title='Visitors' description='Manage visitors' />
      <VisitorsPage />
    </div>
  );
}