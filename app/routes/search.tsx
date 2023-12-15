import React, { useState } from 'react';
import axios from 'axios';
import { https, host, port, rest } from '../constants';
import { useNavigate } from 'react-router-dom';
import { type BuchProps, Buch } from '~/Components/buch';


function SearchPage() {
    const [id, setId] = useState('');
    const [art, setArt] = useState('');
    const [result, setResult] = useState<BuchProps | BuchProps[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const navigateToIndex = () => {
        navigate('/');
      };


      const handleGetByArt = () => {
        axios.get(`${https}${host}${port}${rest}?art=${art}`)
             .then(response => {
               if (response.data._embedded) {
                setResult(response.data._embedded.buecher);
                setError(null);
               } else {
                throw new Error('Keine Buecher dieser Art vorhanden')
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
                throw new Error('Type in an ID')
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

    const handleGetAllBuecher = () => {
        axios.get(`${https}${host}${port}${rest}`)
        .then(response => {
            const buecherData = response.data._embedded.buecher.map((buch: any) => ({
                isbn: buch.isbn,
                rating: buch.rating,
                art: buch.art,
                preis: buch.preis,
                rabatt: buch.rabatt,
                lieferbar: buch.lieferbar,
                datum: buch.datum,
                homepage: buch.homepage,
                schlagwoerter: buch.schlagwoerter,
            }))
            setError(null);
            setResult(buecherData);
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
                <button onClick={handleGetAllBuecher} className="btn btn-primary ms-3">Suche alle Buecher</button>
                <button onClick={handleGetByArt} className="btn btn-primary ms-3">Suche nach Art</button>
                <select value={art} onChange={(e) => setArt(e.target.value)} className="form-select ms-3" style={{ width: '200px' }}>
                    <option value="">Select Art</option>
                    <option value="ACTION">Action</option>
                    <option value="HORROR">Horror</option>
                    <option value="FANTASY">Fantasy</option>
                    <option value="SCIENCEFICTION">Sciencefiction</option>
                </select>
            </div>
            <div className="d-flex justify-content-center" style={{ marginTop: '30px' }}>
                <input type="text" className="form-control" value={id} onChange={(e) => setId(e.target.value)} style={{ width: '300px' }} />
            </div>
            <div style={{ marginTop: '50px' }}>
    {result && (
        <table className="table table-striped table-hover table-bordered">
            <thead className="table-dark">
                <tr>
                    <th>ISBN</th>
                    <th>Rating</th>
                    <th>Art</th>
                    <th>Preis</th>
                    <th>Rabatt</th>
                    <th>Lieferbar</th>
                    <th>Datum</th>
                    <th>Homepage</th>
                    <th>Schlagwörter</th>
                </tr>
            </thead>
            <tbody>
            {Array.isArray(result) ? result.map((buch) => (
                <Buch 
                  key={buch.isbn} 
                  isbn={buch.isbn} 
                  rating={buch.rating} 
                  art={buch.art} 
                  preis={buch.preis}
                  rabatt={buch.rabatt}
                  lieferbar={buch.lieferbar}
                  datum={buch.datum}
                  homepage={buch.homepage}
                  schlagwoerter={buch.schlagwoerter}
                />
            )): (
                result ? (
                <Buch 
                key={result.isbn} 
                isbn={result.isbn} 
                rating={result.rating} 
                art={result.art} 
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
