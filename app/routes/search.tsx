import React, { useState } from 'react';
import axios from 'axios';
import { https, host, port, rest } from '../constants';
import { useNavigate } from 'react-router-dom';
import { type FilmProps, Film } from '~/Components/film';


function SearchPage() {
    const [id, setId] = useState('');
    const [genre, setGenre] = useState('');
    const [result, setResult] = useState<FilmProps | FilmProps[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const navigateToIndex = () => {
        navigate('/');
      };


      const handleGetByGenre = () => {
        axios.get(`${https}${host}${port}${rest}?genre=${genre}`)
             .then(response => {
               if (response.data._embedded) {
                setResult(response.data._embedded.filme);
                setError(null);
               } else {
                throw new Error('No films found for this genre')
               }
            })
             .catch(err => {
                setError(err.message);
                setTimeout(() => setError(null), 5000);
                setResult(null);
            });
    };

    const handleGetId = () => {
        axios.get(`${https}${host}${port}${rest}${id}`)
             .then(response => {
               if (response.data._embedded) {
                throw new Error('Type in an Id')
               } else {
                setResult(response.data);
                setError(null);
               }
            })
             .catch(err => {
                setError(err.message);
                setTimeout(() => setError(null), 5000);
                setResult(null);
            });
    };

    const handleGetAllFilms = () => {
        axios.get(`${https}${host}${port}${rest}`)
        .then(response => {
            const filmsData = response.data._embedded.filme.map((film: any) => ({
                isan: film.isan,
                rating: film.rating,
                genre: film.genre,
                preis: film.preis,
                rabatt: film.rabatt,
                lieferbar: film.lieferbar,
                datum: film.datum,
                homepage: film.homepage,
                schlagwoerter: film.schlagwoerter,
            }))
            setError(null);
            setResult(filmsData);
        })
        .catch(err => {
            setError('Failed to fetch data');
            setResult(null);
        });
    };

    return (
        <div style={{ 
            background: 'linear-gradient(#90AFC5, #3B7EA1)', 
            minHeight: '100vh' 
        }}>   
            <div className="mt-3 ms-3">
                <button onClick={navigateToIndex} className="btn btn-primary">Zurück zur Startseite</button>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <button onClick={handleGetId} className="btn btn-primary ms-3">Suche mit ID</button>
                <button onClick={handleGetAllFilms} className="btn btn-primary ms-3">Suche alle Filme</button>
                <button onClick={handleGetByGenre} className="btn btn-primary ms-3">Suche nach Genre</button>
                <select value={genre} onChange={(e) => setGenre(e.target.value)} className="ms-3">
                    <option value="">Select Genre</option>
                    <option value="ACTION">Action</option>
                    <option value="HORROR">Horror</option>
                    <option value="FANTASY">Fantasy</option>
                    <option value="SCIENCEFICTION">Sciencefiction</option>
                </select>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <input type="text" className="form-control" value={id} onChange={(e) => setId(e.target.value)} />
            </div>
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
                        </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(result) ? result.map((film) => (
                    <Film 
                      key={film.isan} 
                      isan={film.isan} 
                      rating={film.rating} 
                      genre={film.genre} 
                      preis={film.preis}
                      rabatt={film.rabatt}
                      lieferbar={film.lieferbar}
                      datum={film.datum}
                      homepage={film.homepage}
                      schlagwoerter={film.schlagwoerter}
                    />
                    )): (
                        result ? (
                        <Film 
                        key={result.isan} 
                        isan={result.isan} 
                        rating={result.rating} 
                        genre={result.genre} 
                        preis={result.preis}
                        rabatt={result.rabatt}
                        lieferbar={result.lieferbar}
                        datum={result.datum}
                        homepage={result.homepage}
                        schlagwoerter={result.schlagwoerter}
                    />
                        ) : null
                )}
                    </tbody>
                </table>
            )}
            {error && <p>{error}</p>}
        </div>
    );
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
