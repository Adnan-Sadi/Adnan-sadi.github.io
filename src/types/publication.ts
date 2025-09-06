export type ToggleBtn = {
  kind: 'toggle';
  label: string;
  target: 'abstract' | 'bibtex' | 'custom';
  content: string;
};
export type AssetBtn = {
  kind: 'asset';
  label: string;
  path: string;
  download?: boolean;
};
export type LinkBtn = {
  kind: 'link';
  label: string;
  href: string;
};
export type Btn = ToggleBtn | AssetBtn | LinkBtn;

export type Pub = {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  date: string; // ISO date
  year: number;
  thumbnail?: string;
  citationCount?: number | null;
  selected?: boolean;
  buttons: Btn[];
};