export interface BuchProps {
    isbn: string;
    rating: number;
    art: string;
    preis: number;
    rabatt: number;
    lieferbar: boolean;
    datum: string;
    homepage: string;
    schlagwoerter: string[];
    titel: TitelProps;
}

export interface TitelProps {
    titel: string;
    untertitel?: string;
}
