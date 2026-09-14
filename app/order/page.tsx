import { Suspense } from 'react';
import { SiteNav, SiteFooter } from '@/components/Site';
import OrderFlow from './OrderFlow';
export const metadata = { title: 'Създай своя таг · PetaLapa' };
export default function OrderPage() {
  return (<main><SiteNav /><div className="container"><Suspense><OrderFlow /></Suspense></div><SiteFooter /></main>);
}
