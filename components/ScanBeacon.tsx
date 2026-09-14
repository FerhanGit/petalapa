'use client';
import { useEffect } from 'react';

// Записва сканирането; иска локация само ако сканиращият разреши. Без блокиране на UI.
export default function ScanBeacon({ scanId }: { scanId: number | null }) {
  useEffect(() => {
    if (!scanId || !('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (p) => { fetch('/api/scans', { method: 'PATCH', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ scanId, lat: p.coords.latitude, lng: p.coords.longitude }), keepalive: true }).catch(() => {}); },
      () => {}, { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 });
  }, [scanId]);
  return null;
}
