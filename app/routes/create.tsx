import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { REST_API_URL } from '~/constants';
import { withAuth } from '../components/AuthentificationComponent';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { Button } from '../components/ButtonComponent';
import { Footer } from '../components/FooterComponent';
import { handleCreateError } from '~/utils/handleError';
import { useAuthHeaders } from '../hooks/useAuthHeaders';

const CreatePage: React.FC = () => {
  const [isbn, setISBN] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [art, setArt] = useState<string | undefined>('');
  const [preis, setPreis] = useState<number | ''>('');
  const [rabatt, setRabatt] = useState<number>(0);
  const [lieferbar, setLieferbar] = useState<boolean>(false);
  const [datum, setDatum] = useState<string>('');
  const [homepage, setHomepage] = useState<string>('');
  const [schlagwoerter, setSchlagwoerter] = useState<string[]>([]);
  const [titel, setTitel] = useState<string>('');
  const [untertitel, setUntertitel] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const values: Record<string, string | number | undefined> = {
    isbn,
    art,
    rabatt,
    preis,
    datum,
    homepage,
    titel,
  };

  const {
    handleInputChange,
    handleNumberChange,
    handleSelectChange,
    handleCheckboxChange,
    handleArrayChange,
  } = useFormHandlers();

  const navigate = useNavigate();
  const navigateToIndex = () => {
    navigate('/');
  };

  const createHeaders = useAuthHeaders();

  const properties = [
    'titel',
    'isbn',
    'art',
    'preis',
    'rabatt',
    'lieferbar',
    'datum',
    'homepage',
    'schlagwoerter',
  ];

  const createBuch = () => ({
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
    },
  });

  const errorMessagesInvalid: Record<string, string> = {
    isbn: 'Ungültiges ISBN-Format!',
    rabatt: 'Geben Sie bitte ein gültigen Rabatt an',
    preis: 'Bitte geben Sie einen gültigen Preis an',
    datum: 'Geben Sie bitte ein gültiges Datum an',
    homepage: 'Geben Sie bitte eine gültige Homepage an',
    titel:
      'Geben Sie bitte einen gültigen Titel ein. Es sind nur Buchstaben und Zahlen erlaubt!',
  };

  const errorMessagesNull: Record<string, string> = {
    isbn: 'Sie müssen eine ISBN eintragen!',
    art: 'Sie müssen eine Buchart eintragen!',
    rabatt: 'Sie müssen einen Rabatt eintragen!',
    preis: 'Sie müssen einen Preis eintragen!',
    datum: 'Sie müssen ein Datum eintragen!',
    homepage: 'Sie müssen eine Homepage eintragen!',
    titel: 'Sie müssen einen Titel eintragen!',
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const headers = createHeaders();
    const buch = createBuch();

    axios
      .post(REST_API_URL, buch, { headers })
      .then((response) => {
        setResult(response.data);
      })
      .catch((err) =>
        handleCreateError(
          setErrors,
          setError,
          errorMessagesInvalid,
          errorMessagesNull,
          properties,
          values,
          err,
        ),
      );
  };

  return (
    <div
      className="container"
      style={{
        minHeight: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
        marginTop: '60px',
        marginBottom: '60px',
      }}
    >
      <h1>Buch anlegen </h1>
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ISBN:</label>
          <input
            type="text"
            className="form-control"
            value={isbn}
            onChange={(event) => handleInputChange(event, setISBN)}
            placeholder="z.B. 978-3-7375-0553-6"
          />
          {errors['isbn'] && <p className="error">{errors['isbn']}</p>}
        </div>
        <div className="form-group">
          <label>Rating:</label>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {[1, 2, 3, 4, 5].map((value) => (
              <div key={value} style={{ marginRight: '15px' }}>
                <input
                  type="radio"
                  id={`rating-${value}`}
                  name="rating"
                  value={value}
                  checked={rating === value}
                  onChange={(event) => handleNumberChange(event, setRating)}
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
          <select
            className="form-control"
            value={art}
            onChange={(event) => handleSelectChange(event, setArt)}
          >
            <option value="">Select Art</option>
            <option value="KINDLE">KINDLE</option>
            <option value="DRUCKAUSGABE">DRUCKAUSGABE</option>
          </select>
          {errors['art'] && <p className="error">{errors['art']}</p>}
        </div>
        <div className="form-group">
          <label>Preis:</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={preis}
            onChange={(event) => handleNumberChange(event, setPreis)}
            placeholder="in €"
          />
          {errors['preis'] && <p className="error">{errors['preis']}</p>}
        </div>
        <div className="form-group">
          <label>Rabatt:</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={rabatt}
            onChange={(event) => handleNumberChange(event, setRabatt)}
          />
          {errors['rabatt'] && <p className="error">{errors['rabatt']}</p>}
        </div>
        <div className="form-group">
          <label>Lieferbar:</label>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {['true', 'false'].map((value) => (
              <div key={value} style={{ marginRight: '15px' }}>
                <input
                  type="radio"
                  id={`lieferbar-${value}`}
                  name="lieferbar"
                  value={value}
                  checked={lieferbar.toString() === value}
                  onChange={(event) =>
                    handleCheckboxChange(event, setLieferbar)
                  }
                />
                <label htmlFor={`lieferbar-${value}`}>
                  {value === 'true' ? 'Ja' : 'Nein'}
                </label>
              </div>
            ))}
          </div>
          {errors['lieferbar'] && (
            <p className="error">{errors['lieferbar']}</p>
          )}
        </div>
        <div className="form-group">
          <label>Datum:</label>
          <input
            type="text"
            className="form-control"
            value={datum}
            onChange={(event) => handleInputChange(event, setDatum)}
            placeholder="YYYY-MM-DD"
            style={{ color: datum ? 'black' : 'gray' }}
          />
          {errors['datum'] && <p className="error">{errors['datum']}</p>}
        </div>
        <div className="form-group">
          <label>Homepage:</label>
          <input
            type="text"
            className="form-control"
            value={homepage}
            onChange={(event) => handleInputChange(event, setHomepage)}
            placeholder="https://www.website.com"
          />
          {errors['homepage'] && <p className="error">{errors['homepage']}</p>}
        </div>
        <div className="form-group">
          <label>Schlagwörter:</label>
          <input
            type="text"
            className="form-control"
            value={schlagwoerter}
            onChange={(event) => handleArrayChange(event, setSchlagwoerter)}
          />
          {errors['schlagwoerter'] && (
            <p className="error">{errors['schlagwoerter']}</p>
          )}
        </div>
        <div className="form-group">
          <label>Titel:</label>
          <input
            type="text"
            className="form-control"
            value={titel}
            onChange={(event) => handleInputChange(event, setTitel)}
          />
          {errors['titel'] && <p className="error">{errors['titel']}</p>}
        </div>
        <div className="form-group">
          <label>Untertitel:</label>
          <input
            type="text"
            className="form-control"
            value={untertitel}
            onChange={(event) => handleInputChange(event, setUntertitel)}
          />
        </div>
        <div></div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: '20px' }}
        >
          Create
        </button>
      </form>
      {result && <p>Result: {JSON.stringify(result)}</p>}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
        }}
      >
        <Button
          onClick={navigateToIndex}
          text="Zurück zur Startseite"
          classes="hover-effect ms-3 mt-4"
        />
      </div>
      <Footer />
    </div>
  );
};

const ProtectedCreatePage = withAuth(CreatePage);
export default ProtectedCreatePage;
