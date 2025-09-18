import { Heading } from '@/components/ui/heading';
import VendorsPage from '@/features/tables/vendors';

export default function Vendors() {
  return (
    <div>
      <Heading title='Vendors' description='Manage vendors' />
      <VendorsPage />
    </div>
  );
}