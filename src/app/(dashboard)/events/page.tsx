import { Heading } from '@/components/ui/heading';
import EventsPage from '@/features/tables/events';

export default function Events() {
  return (
    <div>
      <Heading title='Events' description='Manage events' />
      <EventsPage />
    </div>
  );
}