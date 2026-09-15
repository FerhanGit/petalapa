import { Suspense } from 'react';
import { SiteNav } from '@/components/Site';
import OrderFlow from './OrderFlow';

export const metadata = { title: 'Поръчка · petalapa' };

export default function OrderPage() {
  return (
    <main className="ref-order-page">
      <SiteNav />
      <div className="ref-shell ref-order-shell">
        <Suspense><OrderFlow /></Suspense>
      </div>
    </main>
  );
}
