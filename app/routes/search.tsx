import React, { useState } from 'react';
import axios from 'axios';
import { https, host, port, rest } from '../constants';
import { type Film } from '../types/types';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
    const [id, setId] = useState('');
    const [result, setResult] = useState<Film | Film[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const navigateToIndex = () => {
        navigate('/');
      };

    const handleGetId = () => {
        axios.get(`${https}${host}${port}${rest}${id}`)
             .then(response => {
               setResult(response.data);
               setError(null);
            })
             .catch(err => {
               setError('Failed to fetch data');
               setResult(null);
            });
    };

    const handleGetAllFilms = () => {
        axios.get(`${https}${host}${port}${rest}`)
             .then(response => {
               setResult(response.data);
               console.log(response)
               setError(null);
            })
             .catch(error => {
               setError('Failed to fetch all films');
               setResult(null);
            });
    };

    return (
        <div>
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
            <button onClick={handleGetId}>Suche mit ID</button>
            <button onClick={handleGetAllFilms}>Suche alle Filme</button>
            {result && (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ISAN</th>
                            <th>Rating</th>
                            <th>Genre</th>
                            <th>Preis</th>
                            <th>Rabatt</th>
                            <th>Lieferbar</th>
                            <th>Datum</th>
                            <th>Homepage</th>
                            <th>Schlagwörter</th>
                            <th>Titel</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(result) ? result.map((film, index) => (
                      <FilmRow film={film} index={index} key={film.isan} />
                      )): (
                      <FilmRow film={result} index={0} key={result.isan} />
                      )}
                    </tbody>
                </table>
            )}
            <>
            <button onClick={navigateToIndex} className="btn btn-primary ms-5">Zurück zur Startseite</button>
            </>
            {error && <p>{error}</p>}
        </div>
    );

    function FilmRow({ film, index }: { film: Film; index: number }) {
        return (
            <tr key={index}>
                <td>{film.isan}</td>
                <td>{film.rating}</td>
                <td>{film.genre}</td>
                <td>{film.preis}</td>
                <td>{film.rabatt}</td>
                <td>{film.lieferbar ? 'Ja' : 'Nein'}</td>
                <td>{film.datum}</td>
                <td><a href={film.homepage}>{film.homepage}</a></td>
                <td>{film.schlagwoerter && film.schlagwoerter.join(', ')}</td>
                <td>
                    {film.titel && (
                    <>
                        <p>Titel: {film.titel.titel}</p>
                        <p>Untertitel: {film.titel.untertitel}</p>
                    </>
                    )}
                </td>
            </tr>
        );
    }
}

function withAuth(Component: React.ComponentType) {
    return function ProtectedRoute(props: any) {
      const navigate = useNavigate();
      const token = localStorage.getItem('authToken');
  
      if (!token) {
        navigate('/');
        return null;
      }
      return <Component {...props} />;
    };
  }

const ProtectedSearchPage = withAuth(SearchPage);

export default ProtectedSearchPage;