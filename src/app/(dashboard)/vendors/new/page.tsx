import { Heading } from '@/components/ui/heading';
import VendorForm from '@/features/tables/vendors/form';

export default function Page() {
  return (
    <div>
      <Heading title='Vendors' description='Manage vendors' />
      <VendorForm pageTitle='Create Vendor' />
    </div>
  );
}