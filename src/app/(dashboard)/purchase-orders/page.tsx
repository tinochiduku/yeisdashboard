import { Heading } from '@/components/ui/heading';
import PurchaseOrdersPage from '@/features/tables/purchase-orders';

export default function PurchaseOrders() {
  return (
    <div>
      <Heading title='Purchase Orders' description='Manage purchase orders' />
      <PurchaseOrdersPage />
    </div>
  );
}