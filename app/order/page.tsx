import { Suspense } from 'react';
import { SiteNav } from '@/components/Site';
import OrderFlow from './OrderFlow';

export const metadata = { title: 'Поръчка · petalapa' };

export default function OrderPage() {
  return (
    <main className="approved-site reference-order-page">
      <SiteNav />
      <div className="final-wrap">
        <section className="final-order-form-section">
          <Suspense><OrderFlow /></Suspense>
        </section>
      </div>
    </main>
  );
}
