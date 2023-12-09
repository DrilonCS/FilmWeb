export type Film = {
    id: number;
    isan: string;
    rating: number;
    genre: string;
    preis: number;
    rabatt: number;
    lieferbar: boolean;
    datum: string;
    homepage: string;
    schlagwoerter: string[];
    titel: {
        titel: string;
        untertitel: string;
    };
}