import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { https, host, port, rest } from '~/constants';

const CreatePage: React.FC = () => {
    const [isan, setISAN] = useState('');
    const [rating, setRating] = useState<number>(0);
    const [genre, setGenre] = useState('');
    const [preis, setPreis] = useState<number | ''>('');
    const [rabatt, setRabatt] = useState<number>(0);
    const [lieferbar, setLieferbar] = useState<boolean>(false);
    const [datum, setDatum] = useState('');
    const [homepage, setHomepage] = useState('');
    const [schlagwoerter, setSchlagwoerter] = useState<string[]>([]);
    const [titel, setTitel] = useState<string>('');
    const [untertitel, setUntertitel] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);

    const navigate = useNavigate();
    const navigateToIndex = () => {
        navigate('/');
    };

    const handleISANChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setISAN(event.target.value);
    };

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRating(Number(event.target.value));
    }

    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGenre(event.target.value);
    };

    const handlePreisChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPreis(parseFloat(event.target.value));
    };

    const handleRabattChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value) / 100;
        if (!isNaN(value) && value >= 0 && value <= 1) {
            setRabatt(value);
        }
    };

    const handleLieferbarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLieferbar(event.target.value === 'true');
    }

    const handleDatumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDatum(event.target.value);
    }

    const handleHomepageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHomepage(event.target.value);
    }

    const handleSchlagwoerterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.split(',').map(s => s.trim());
        setSchlagwoerter([...new Set(value)]);
    };

    const handleTitelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitel(event.target.value);
    }

    const handleUntertitelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUntertitel(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const film = {
            isan,
            rating,
            genre,
            preis,
            rabatt,
            lieferbar,
            datum,
            homepage,
            schlagwoerter,
            titel: {
                titel,
                untertitel,
            }
        };

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        }

        axios.post(`${https}${host}${port}${rest}`, film, { headers })
            .then(response => {
                setResult(response.data);
             })
            .catch(error => {
                setError(error.message);
             });
    };

    useEffect(() => {
        const originalStyleHtml = window.getComputedStyle(document.documentElement).background;
        const originalStyleBody = window.getComputedStyle(document.body).background;
        document.documentElement.style.background = 'linear-gradient(#90AFC5, #3B7EA1)';
        document.body.style.background = 'linear-gradient(#90AFC5, #3B7EA1)';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        return () => {
            document.documentElement.style.background = originalStyleHtml;
            document.body.style.background = originalStyleBody;
            document.body.style.margin = '';
            document.body.style.padding = '';
        };
    }, []);

    return (
        <div className="container" style={{ 
            minHeight: '100vh', 
            padding: '20px',
            boxSizing: 'border-box',
            marginTop: '60px',
        }}>
            <h1>Create Movie</h1>
            {error && <p>Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>ISAN:</label>
                    <input type="text" className="form-control" value={isan} onChange={handleISANChange} />
                </div>
                <div className="form-group">
                    <label>Rating:</label>
                    <div style={{ display: 'flex', justifyContent: 'flex-start'}}>
                        {[1, 2, 3, 4, 5].map((value) => (
                        <div key={value} style={{ marginRight: '15px' }}>
                            <input
                            type="radio"
                            id={`rating-${value}`}            
                            name="rating"
                            value={value}
                            checked={rating === value}
                            onChange={handleRatingChange}
                            />
                            <label htmlFor={`rating-${value}`}>{value}</label>
                        </div>
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label>Genre:</label>
                    <select className="form-control" value={genre} onChange={handleGenreChange}>
                        <option value="">Select Genre</option>
                        <option value="ACTION">ACTION</option>
                        <option value="HORROR">HORROR</option>
                        <option value="FANTASY">FANTASY</option>
                        <option value="SCIENCEFICTION">SCIENCEFICTION</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Preis:</label>
                    <input type="number" className="form-control" value={preis} onChange={handlePreisChange} />
                </div>
                <div className="form-group">
                    <label>Rabatt:</label>
                    <input type="text" className="form-control" value={Number(rabatt)} onChange={handleRabattChange} />
                </div>
                <div className="form-group">
                    <label>Lieferbar:</label>
                    <div style={{ display: 'flex', justifyContent: 'flex-start'}}>
                        {['true', 'false'].map((value) => (
                            <div key={value} style={{ marginRight: '15px' }}>
                                <input
                                type="radio"
                                id={`lieferbar-${value}`}
                                name="lieferbar"
                                value={value}
                                checked={lieferbar.toString() === value}
                                onChange={handleLieferbarChange}
                                />
                                <label htmlFor={`lieferbar-${value}`}>{value === 'true' ? 'Ja' : 'Nein'}</label>
                            </div>
                    ))}
                    </div>
                </div>
                <div className="form-group">
                    <label>Datum:</label>
                    <input type="text" className="form-control" value={datum} onChange={handleDatumChange} />
                </div>
                <div className="form-group">
                    <label>Homepage:</label>
                    <input type="text" className="form-control" value={homepage} onChange={handleHomepageChange} />
                </div>
                <div className="form-group">
                    <label>Schlagwörter:</label>
                    <input type="text" className="form-control" value={schlagwoerter} onChange={handleSchlagwoerterChange} />
                </div>
                <div className="form-group">
                    <label>Titel:</label>
                    <input type="text" className="form-control" value={titel} onChange={handleTitelChange}></input>
                </div>
                <div className="form-group">
                    <label>Untertitel:</label>
                    <input type="text" className="form-control" value={untertitel} onChange={handleUntertitelChange}></input>
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>Create</button>
            </form>
            {result && <p>Result: {JSON.stringify(result)}</p>}
            <div style={{ 
            position: 'absolute', 
            top: '10px', 
            left: '10px'
            }}>
            <button onClick={navigateToIndex} className="btn btn-primary">Zurück zur Startseite</button>
            </div>
        </div>
    );
};

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
  
  const ProtectedCreatePage = withAuth(CreatePage);
  export default ProtectedCreatePage;
