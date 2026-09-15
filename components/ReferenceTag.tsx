import { PhotoTag, STYLES } from './PhotoTag';

export type TagVariant =
  | 'forest' | 'ocean' | 'blush' | 'galaxy' | 'paw' | 'amber' | 'love' | 'custom'
  | 'classic' | 'floral' | 'natural' | 'premium';

const SLUG: Record<TagVariant, string> = {
  forest: 'forest',
  classic: 'forest',
  ocean: 'ocean',
  blush: 'floral',
  floral: 'floral',
  galaxy: 'galaxy',
  paw: 'minimal',
  premium: 'minimal',
  amber: 'wood',
  natural: 'wood',
  love: 'love',
  custom: 'custom',
};

export function ReferenceTag({ variant, size = 86, photo = false }: { variant: TagVariant; size?: number; photo?: boolean }) {
  const style = STYLES.find((item) => item.slug === SLUG[variant]) ?? STYLES[0];
  return (
    <span className={`reference-round-tag reference-round-tag-${variant}${photo ? ' is-photo' : ''}`} aria-hidden>
      <PhotoTag s={style} size={size} qr={false} nfc={false} />
    </span>
  );
}
