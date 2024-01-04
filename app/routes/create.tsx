import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { REST_API_URL } from '~/constants/constants';
import { withAuth } from '../components/AuthentificationComponent';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { handleCreateError } from '~/handler/handleError';
import { useAuthHeaders } from '../hooks/useAuthHeaders';
import { Footer } from '../components/FooterComponent';

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
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
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
        setShowSuccessAlert(true);
        setISBN('');
        setRating(0);
        setArt('');
        setPreis('');
        setRabatt(0);
        setLieferbar(false);
        setDatum('');
        setHomepage('');
        setSchlagwoerter([]);
        setTitel('');
        setUntertitel('');
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
    <Container
      style={{
        minHeight: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
        marginTop: '60px',
        marginBottom: '60px',
      }}
    >
      <h1>Buch anlegen </h1>
      {error && <Alert variant="danger">Error: {error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>ISBN:</Form.Label>
          <Form.Control
            type="text"
            value={isbn}
            onChange={(event) => handleInputChange(event, setISBN)}
            placeholder="z.B. 978-3-7375-0553-6"
          />
          {errors['isbn'] && <Alert variant="danger">{errors['isbn']}</Alert>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Rating:</Form.Label>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {[1, 2, 3, 4, 5].map((value) => (
              <div key={value} style={{ marginRight: '15px' }}>
                <Form.Check
                  type="radio"
                  id={`rating-${value}`}
                  name="rating"
                  value={value}
                  checked={rating === value}
                  onChange={(event) => handleNumberChange(event, setRating)}
                  label={Array.from({ length: value }, (_, index) => (
                    <span key={index}>★</span>
                  ))}
                />
              </div>
            ))}
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Art:</Form.Label>
          <Form.Control
            as="select"
            value={art}
            onChange={(event) => handleSelectChange(event, setArt)}
          >
            <option value="">Select Art</option>
            <option value="KINDLE">KINDLE</option>
            <option value="DRUCKAUSGABE">DRUCKAUSGABE</option>
          </Form.Control>
          {errors['art'] && <Alert variant="danger">{errors['art']}</Alert>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Preis:</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={preis}
            onChange={(event) => handleNumberChange(event, setPreis)}
            placeholder="in €"
          />
          {errors['preis'] && <Alert variant="danger">{errors['preis']}</Alert>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Rabatt:</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={rabatt}
            onChange={(event) => handleNumberChange(event, setRabatt)}
          />
          {errors['rabatt'] && (
            <Alert variant="danger">{errors['rabatt']}</Alert>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Lieferbar:</Form.Label>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {['true', 'false'].map((value) => (
              <div key={value} style={{ marginRight: '15px' }}>
                <Form.Check
                  type="radio"
                  id={`lieferbar-${value}`}
                  name="lieferbar"
                  value={value}
                  checked={lieferbar.toString() === value}
                  onChange={(event) =>
                    handleCheckboxChange(event, setLieferbar)
                  }
                  label={value === 'true' ? 'Ja' : 'Nein'}
                />
              </div>
            ))}
          </div>
          {errors['lieferbar'] && (
            <Alert variant="danger">{errors['lieferbar']}</Alert>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Datum:</Form.Label>
          <Form.Control
            type="text"
            value={datum}
            onChange={(event) => handleInputChange(event, setDatum)}
            placeholder="YYYY-MM-DD"
            style={{ color: datum ? 'black' : 'gray' }}
          />
          {errors['datum'] && <Alert variant="danger">{errors['datum']}</Alert>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Homepage:</Form.Label>
          <Form.Control
            type="text"
            value={homepage}
            onChange={(event) => handleInputChange(event, setHomepage)}
            placeholder="https://www.website.com"
          />
          {errors['homepage'] && (
            <Alert variant="danger">{errors['homepage']}</Alert>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Schlagwörter:</Form.Label>
          <Form.Control
            type="text"
            value={schlagwoerter}
            onChange={(event) => handleArrayChange(event, setSchlagwoerter)}
          />
          {errors['schlagwoerter'] && (
            <Alert variant="danger">{errors['schlagwoerter']}</Alert>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Titel:</Form.Label>
          <Form.Control
            type="text"
            value={titel}
            onChange={(event) => handleInputChange(event, setTitel)}
          />
          {errors['titel'] && <Alert variant="danger">{errors['titel']}</Alert>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Untertitel:</Form.Label>
          <Form.Control
            type="text"
            value={untertitel}
            onChange={(event) => handleInputChange(event, setUntertitel)}
          />
        </Form.Group>
        <div></div>
        <Button type="submit" variant="primary" style={{ marginTop: '20px' }}>
          Create
        </Button>
      </Form>
      {showSuccessAlert && (
        <Alert
          variant="success"
          style={{ marginTop: '20px' }}
          onClose={() => setShowSuccessAlert(false)}
          dismissible
        >
          Buch erfolgreich erstellt!
        </Alert>
      )}
      {result && <p>Result: {JSON.stringify(result)}</p>}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
        }}
      >
        <Button onClick={navigateToIndex} className="hover-effect ms-3 mt-4">
          Zurück zur Startseite
        </Button>
      </div>
      <Footer />
    </Container>
  );
};

const ProtectedCreatePage = withAuth(CreatePage);
export default ProtectedCreatePage;
