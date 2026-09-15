'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { TagStyle } from './Brand';
const CATS: [string, string][] = [['all', 'Всички'], ['nature', 'Природа'], ['flowers', 'Цветя'], ['sea', 'Море'], ['space', 'Космос'], ['abstract', 'Абстрактни'], ['sparkle', 'Блясък'], ['minimal', 'Минимал']];
export default function DesignGrid({ styles, selected, onSelect, hrefBase = '/order?style=' }: { styles: TagStyle[]; selected?: string; onSelect?: (s: TagStyle) => void; hrefBase?: string }) {
  const [cat, setCat] = useState('all');
  const list = styles.filter((s) => cat === 'all' || s.cat === cat);
  return (
    <>
      <div className="chips">{CATS.map(([v, l]) => <button key={v} className={`chip${cat === v ? ' on' : ''}`} onClick={() => setCat(v)}>{l}</button>)}</div>
      <div className="designs">
        {list.map((s) => onSelect ? (
          <button key={s.slug} className={`design${selected === s.slug ? ' selected' : ''}`} onClick={() => onSelect(s)}><div className="pad"><Image src={s.img} alt={s.name} fill sizes="(max-width: 900px) 33vw, 20vw" style={{ objectFit: 'cover' }} /></div><span className="name">{s.name}</span><span className="price">€{s.price}</span></button>
        ) : (
          <a key={s.slug} className="design" href={`${hrefBase}${s.slug}`}><div className="pad"><Image src={s.img} alt={s.name} fill sizes="(max-width: 900px) 33vw, 20vw" style={{ objectFit: 'cover' }} /></div><span className="name">{s.name}</span><span className="price">€{s.price}</span></a>
        ))}
      </div>
    </>
  );
}
