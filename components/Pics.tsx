'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PAIRS, SINGLES, ALL } from '@/lib/pics';

const pos: Record<string, string> = { '/img/hero-pets.jpg': '50% 30%', '/img/hero-dog.jpg': '50% 20%', '/img/pair-corgi.jpg': '50% 35%', '/img/pair-frenchie.jpg': '50% 40%', '/img/pair-cavalier.jpg': '50% 35%', '/img/life-samoyed.jpg': '50% 30%' };

// Снимка на случаен принцип (различна при всяко зареждане); pool: 'pairs' | 'singles' | 'all'
export function RandomPic({ pool = 'all', alt = '', sizes = '100vw', priority = false, exclude }: { pool?: 'pairs' | 'singles' | 'all'; alt?: string; sizes?: string; priority?: boolean; exclude?: string }) {
  const list = (pool === 'pairs' ? PAIRS : pool === 'singles' ? SINGLES : ALL).filter((s) => s !== exclude);
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => { setSrc(list[Math.floor(Math.random() * list.length)]); /* eslint-disable-next-line */ }, []);
  if (!src) return null;
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: 'cover', objectPosition: pos[src] ?? '50% 30%' }} />;
}

// Hero: двойки куче + котка, сменят се на всеки 10 s с плавен преход, започва от случайна
export function HeroRotator({ interval = 10000 }: { interval?: number }) {
  const [i, setI] = useState<number>(() => Math.floor(Math.random() * PAIRS.length));
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); const t = setInterval(() => setI((x) => (x + 1) % PAIRS.length), interval); return () => clearInterval(t); }, [interval]);
  if (!mounted) return null;
  return (
    <>
      {PAIRS.map((src, k) => (
        <div key={src} className="fade" style={{ opacity: k === i ? 1 : 0 }}>
          <Image src={src} alt="Куче и котка с тагове petalapa" fill sizes="(max-width: 900px) 100vw, 50vw" priority={k === i} style={{ objectFit: 'cover', objectPosition: pos[src] ?? '50% 30%' }} />
        </div>
      ))}
      <div className="dots hero-dots">{PAIRS.map((s, k) => <span key={s} className={k === i ? 'on' : ''} />)}</div>
    </>
  );
}
