import { Heading } from '@/components/ui/heading';
import PurchaseOrderForm from '@/features/tables/purchase-orders/form';

export default function Page() {
  return (
    <div>
      <Heading title='Purchase Orders' description='Manage orders' />
      <PurchaseOrderForm pageTitle='Create Order' />
    </div>
  );
}