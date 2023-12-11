import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { https, host, port, rest } from '~/constants';


const CreateMoviePage: React.FC = () => {
    const [isan, setISAN] = useState('');
    const [rating, setRating] = useState<number>(0);
    const [genre, setGenre] = useState('');
    const [preis, setPreis] = useState('');
    const [rabatt, setRabatt] = useState('');
    const [lieferbar, setLieferbar] = useState('');
    const [datum, setDatum] = useState('');
    const [homepage, setHomepage] = useState('');
    const [schlagwoerter, setSchlagwoerter] = useState('');
    const [titel, setTitel] = useState('');
    const [mehrereschauspieler, setMehrereschauspieler] = useState('');
    const navigate = useNavigate();

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
        setPreis(event.target.value);
    }

    const handleRabattChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRabatt(event.target.value);
    }

    const handleLieferbarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLieferbar(event.target.value);
    }

    const handleDatumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDatum(event.target.value);
    }

    const handleHomepageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHomepage(event.target.value);
    }

    const handleSchlagwoerterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSchlagwoerter(event.target.value);
    }

    const handleTitelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitel(event.target.value);
    };

    const handleMehrereschauspielerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMehrereschauspieler(event.target.value);
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
            titel,
            mehrereschauspieler
        };

        axios.post(`${https}${host}${port}${rest}`, film)
             .then(response => {
                console.log(response);
             })
             .catch(error => {
                console.log(error);
             });
    };

    const navigateToIndex = () => {
        navigate('/');
    };

    return (
        <div className="container">
            <h1>Create Movie</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>ISAN:</label>
                    <input type="text" className="form-control" value={isan} onChange={handleISANChange} />
                </div>
                <div className="form-group">
    <label>Rating:</label>
    <div>
        {[1, 2, 3, 4, 5].map((value) => (
            <div key={value}>
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
                        <option value="Action">Action</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Drama">Drama</option>
                        <option value="Sciencefiction">Sciencefiction</option>
                        {/* Add more genre options here */}
                    </select>
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <input type="date" className="form-control" value={datum} onChange={handleDatumChange} />
                </div>
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" className="form-control" value={titel} onChange={handleTitelChange} />
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
            <button onClick={navigateToIndex} className="btn btn-primary" style={{ marginTop: '10px' }}>Zurück zur Startseite</button>
        </div>
    );
};

export default CreateMoviePage;