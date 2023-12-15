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
  }

export const Buch: React.FC<BuchProps> = ({ isbn, rating, art, preis, rabatt, lieferbar, datum, homepage, schlagwoerter }) => {
  return (
  <tr>
    <td>{isbn}</td>
    <td>{rating}</td>
    <td>{art}</td>
    <td>{preis}</td>
    <td>{rabatt}</td>
    <td>{lieferbar ? 'Ja' : 'Nein'}</td>
    <td>{datum}</td>
    <td>{homepage}</td>
    <td>{schlagwoerter ? schlagwoerter.join(', ') : ''}</td>
    </tr>
    );
  };