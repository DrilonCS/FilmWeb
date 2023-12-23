export interface TitelProps {
  titel: string;
  untertitel?: string;
}

export interface BuchProps {
  isbn: string;
  titel: TitelProps;
  rating: number;
  art: string;
  preis: number;
  rabatt: number;
  lieferbar: boolean;
  datum: string;
  homepage: string;
  schlagwoerter: string[];
}