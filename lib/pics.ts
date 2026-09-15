export const PAIRS = ['/img/hero-pets.jpg', '/img/pair-cavalier.jpg', '/img/pair-doodle.jpg', '/img/pair-corgi.jpg', '/img/pair-lagotto.jpg', '/img/pair-shiba.jpg', '/img/pair-frenchie.jpg'];
export const SINGLES = ['/img/hero-dog.jpg', '/img/life-bengal.jpg', '/img/life-mainecoon.jpg', '/img/life-poodle.jpg', '/img/life-samoyed.jpg'];
export const ALL = [...PAIRS, ...SINGLES];
export const rand = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
