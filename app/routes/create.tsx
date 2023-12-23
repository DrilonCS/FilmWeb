import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { https, host, port, rest } from '~/constants';

const CreatePage: React.FC = () => {
    const [isbn, setISBN] = useState('');
    const [rating, setRating] = useState<number>(0);
    const [art, setArt] = useState<string | undefined>('');
    const [preis, setPreis] = useState<number | ''>('');
    const [rabatt, setRabatt] = useState<number>(0);
    const [lieferbar, setLieferbar] = useState<boolean>(false);
    const [datum, setDatum] = useState('');
    const [homepage, setHomepage] = useState('');
    const [schlagwoerter, setSchlagwoerter] = useState<string[]>([]);
    const [titel, setTitel] = useState('');
    const [untertitel, setUntertitel] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const navigate = useNavigate();
    const navigateToIndex = () => {
        navigate('/');
    };

    const handleISBNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setISBN(event.target.value);
    };

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRating(Number(event.target.value));
    }

    const handleArtChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setArt(event.target.value);
    };

    const handlePreisChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPreis(parseFloat(event.target.value));
    };

    const handleRabattChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRabatt(parseFloat(event.target.value));
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
    };
    const handleUntertitelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUntertitel(event.target.value);
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const buch = {
            isbn,
            rating,
            art,
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

        axios.post(`${https}${host}${port}${rest}`, buch, { headers })
            .then(response => {
                setResult(response.data);
             })
             .catch(error => {
                if (error.response && error.response.data && Array.isArray(error.response.data.message)) {
                    const newErrors: Record<string, string> = {};
                    const properties = ['isbn', 'art', 'preis', 'rabatt', 'lieferbar', 'datum', 'homepage', 'schlagwoerter','titel']; 
                    error.response.data.message.forEach((message: string) => {
                        properties.forEach(property => {
                            if (message.toLowerCase().includes(property)) {
                                newErrors[property] = message;
                            }
                        });
                    });
                    setErrors(newErrors);
                } else {
                    setError(error.message);
                }
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
            <h1>Buch anlegen </h1>
            {error && <p>Error: {error}</p>}
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label>Titel:</label>
                    <input type="text" className="form-control" value={titel} onChange={handleTitelChange}></input>
                    {errors['titel'] && <p className="error">{errors['titel']}</p>}
                </div>
                <div className="form-group">
                    <label>ISBN:</label>
                    <input type="text" className="form-control" value={isbn} onChange={handleISBNChange} placeholder="z.B. 978-3-7375-0553-6" />
                    {errors['isbn'] && <p className="error">{errors['isbn']}</p>}
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
                            <label htmlFor={`rating-${value}`}>
                                {Array.from({ length: value }, (_, index) => (
                                    <span key={index}>★</span>
                                ))}
                            </label>
                        </div>
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label>Art:</label>
                    <select className="form-control" value={art} onChange={handleArtChange}>
                        <option value="">Select Art</option>
                        <option value="KINDLE">KINDLE</option>
                        <option value="DRUCKAUSGABE">DRUCKAUSGABE</option>
                    </select>
                    {errors['art'] && <p className="error">{errors['art']}</p>}
                </div>
                <div className="form-group">
                    <label>Preis:</label>
                    <input type="number" step="0.01" className="form-control" value={preis} onChange={handlePreisChange} placeholder="in €" />
                    {errors['preis'] && <p className="error">{errors['preis']}</p>}
                </div>
                <div className="form-group">
                    <label>Rabatt:</label>
                    <input type="number" step="0.01" className="form-control" value={rabatt} onChange={handleRabattChange} />
                    {errors['rabatt'] && <p className="error">{errors['rabatt']}</p>}
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
                    {errors['lieferbar'] && <p className="error">{errors['lieferbar']}</p>}
                </div>
                <div className="form-group">
                    <label>Datum:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={datum}
                        onChange={handleDatumChange}
                        placeholder="YYYY-MM-DD"
                        style={{ color: datum ? 'black' : 'gray' }}
                    />
                    {errors['datum'] && <p className="error">{errors['datum']}</p>}
                </div>
                <div className="form-group">
                    <label>Homepage:</label>
                    <input type="text" className="form-control" value={homepage} onChange={handleHomepageChange} />
                    {errors['homepage'] && <p className="error">{errors['homepage']}</p>}
                </div>
                <div className="form-group">
                    <label>Schlagwörter:</label>
                    <input type="text" className="form-control" value={schlagwoerter} onChange={handleSchlagwoerterChange} />
                    {errors['schlagwoerter'] && <p className="error">{errors['schlagwoerter']}</p>}
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
