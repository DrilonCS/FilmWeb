export interface FilmProps {
    isan: string;
    rating: number;
    genre: string;
    preis: number;
    rabatt: number;
    lieferbar: boolean;
    datum: string;
    homepage: string;
    schlagwoerter: string[];
  }

export const Film: React.FC<FilmProps> = ({ isan, rating, genre, preis, rabatt, lieferbar, datum, homepage, schlagwoerter }) => {
  return (
  <tr>
    <td>{isan}</td>
    <td>{rating}</td>
    <td>{genre}</td>
    <td>{preis}</td>
    <td>{rabatt}</td>
    <td>{lieferbar ? 'Ja' : 'Nein'}</td>
    <td>{datum}</td>
    <td>{homepage}</td>
    <td>{schlagwoerter ? schlagwoerter.join(', ') : ''}</td>
    </tr>
    );
  };