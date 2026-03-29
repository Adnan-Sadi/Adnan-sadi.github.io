import raw from '../data/publications.json';
import type { Pub, Btn, ScholarStats } from '../types/publication';

type RawBtn = {
  kind?: string;
  label?: string;
  target?: string;
  content?: string;
  path?: string;
  href?: string;
  download?: boolean;
};
type RawPub = Omit<Pub, 'buttons'> & { buttons?: RawBtn[] };

function normalizeButtons(rawBtns: RawBtn[] | undefined): Btn[] {
  const out: Btn[] = [];
  for (const b of rawBtns ?? []) {
    switch (b.kind) {
      case 'toggle':
        if (
          b.label &&
          (b.target === 'abstract' || b.target === 'bibtex' || b.target === 'custom') &&
          typeof b.content === 'string'
        ) {
          out.push({ kind: 'toggle', label: b.label, target: b.target, content: b.content });
        }
        break;
      case 'asset':
        if (b.label && typeof b.path === 'string') {
          out.push({ kind: 'asset', label: b.label, path: b.path, download: !!b.download });
        }
        break;
      case 'link':
        if (b.label && typeof b.href === 'string') {
          out.push({ kind: 'link', label: b.label, href: b.href });
        }
        break;
      default:
        // ignore unknown kinds
        break;
    }
  }
  return out;
}

function normalizePub(p: RawPub): Pub {
  return {
    id: p.id,
    title: p.title,
    authors: p.authors,
    venue: p.venue,
    date: p.date,
    year: p.year,
    thumbnail: p.thumbnail || undefined,
    citationCount: typeof p.citationCount === 'number' ? p.citationCount : null,
    selected: !!p.selected,
    scholarUrl: p.scholarUrl || undefined,
    buttons: normalizeButtons(p.buttons),
  };
}

type RawData = {
  stats: { hIndex: number; i10Index: number };
  publications: RawPub[];
};

export function getPublications(): Pub[] {
  const data = raw as unknown as RawData;
  return data.publications.map(normalizePub);
}

export function getScholarStats(): ScholarStats {
  const data = raw as unknown as RawData;
  const pubs = data.publications;
  const totalCitations = pubs.reduce((sum, p) => sum + (p.citationCount ?? 0), 0);
  return {
    totalCitations,
    hIndex: data.stats.hIndex,
    i10Index: data.stats.i10Index,
  };
}