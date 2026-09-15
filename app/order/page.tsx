import { Suspense } from 'react';
import { SiteNav, SiteFooter } from '@/components/Site';
import OrderFlow from './OrderFlow';

export const metadata = { title: 'Създай своя таг · petalapa' };

export default function OrderPage() {
  return (
    <main className="order-reference">
      <SiteNav />
      <div className="container"><Suspense><OrderFlow /></Suspense></div>
      <SiteFooter />
    </main>
  );
}
