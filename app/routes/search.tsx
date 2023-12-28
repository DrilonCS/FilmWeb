import React, { useState } from 'react';
import { useApi } from '~/hooks/useGetApi';
import { https, host, port, rest } from '../constants';
import { useNavigate } from 'react-router-dom';
import { type BuchProps } from '~/types';
import Modal from 'react-modal';
import SimpleBarChart from './barchart';

function SearchPage() {
  const [id, setId] = useState('');
  const [art, setArt] = useState('');
  const {
    data: result,
    error,
    request: search,
  } = useApi(`${https}${host}${port}${rest}`);
  const [selectedBuch, setSelectedBuch] = useState<BuchProps | null>(null); //state für das ausgewählte Buch
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isChartModalOpen, setChartModalOpen] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false); // state alle ergebnisse feststellen

  const navigate = useNavigate();

  const navigateToIndex = () => {
    navigate('/');
  };

  const handleGetByArt = () => {
    search(`${https}${host}${port}${rest}?art=${art}`);
  };

  const handleGetId = () => {
    search(`${https}${host}${port}${rest}${id}`);
  };

  const handleGetAllBuecher = () => {
    search(`${https}${host}${port}${rest}`);
  };

  const handleShowDetails = (buch: BuchProps) => {
    setSelectedBuch(buch);
    setModalIsOpen(true);
  };

  const handleCloseDetails = () => {
    setSelectedBuch(null);
    setModalIsOpen(false);
  };

  // Funktionen zum Öffnen und Schließen des Diagramm-Modals hinzufügen
  const handleOpenChartModal = () => {
    setChartModalOpen(true);
  };

  const handleCloseChartModal = () => {
    setChartModalOpen(false);
  };

  const handleToggleShowAllResults = () => {
    setShowAllResults(!showAllResults);
  };

  return (
    <div
      style={{
        background: 'linear-gradient(#90AFC5, #3B7EA1)',
        minHeight: '100vh',
      }}
    >
      <div className="mt-3 ms-3">
        <button
          onClick={navigateToIndex}
          className="btn btn-primary hover-effect"
        >
          Zurück zur Startseite
        </button>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button
          onClick={handleGetId}
          className="btn btn-primary ms-3 mt-4 hover-effect"
        >
          Suche mit ID
        </button>
        <button
          onClick={handleGetAllBuecher}
          className="btn btn-primary ms-3 mt-4 hover-effect"
        >
          Suche alle Buecher
        </button>
        <button
          onClick={handleGetByArt}
          className="btn btn-primary ms-3 mt-4 hover-effect"
        >
          Suche nach Art
        </button>
        <select
          value={art}
          onChange={(e) => setArt(e.target.value)}
          className="btn btn-primary ms-3 mt-4 bg-white text-dark hover-effect"
          style={{ width: '200px' }}
        >
          <option value="">Auswahl</option>
          <option value="KINDLE">KINDLE</option>
          <option value="DRUCKAUSGABE">DRUCKAUSGABE</option>
        </select>
        <button
          onClick={handleOpenChartModal}
          className="btn btn-primary ms-3 mt-4 hover-effect"
        >
          Statistik
        </button>
      </div>
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: '31px' }}
      >
        <input
          type="text"
          className="form-control"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{ width: '300px' }}
        />
      </div>
      <div style={{ marginTop: '51px' }}>
        {result && (
          <table
            className="table table-striped table-hover table-bordered"
            style={{ border: '3px solid blue' }}
          >
            <thead className="table-dark">
              <tr>
                <th className="hover-effect">Titel</th>
                <th className="hover-effect">Rating</th>
                <th className="hover-effect">Art</th>
                <th className="hover-effect">Preis</th>
                <th className="hover-effect">Rabatt</th>
                <th className="hover-effect">Details</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(result) ? (
                result.slice(0, showAllResults ? result.length : 5).map((buch) => (
                  <tr key={buch.isbn}>
                    <td>{buch.titel.titel}</td>
                    <td>{buch.rating}</td>
                    <td>{buch.art}</td>
                    <td>{buch.preis} €</td>
                    <td>{buch.rabatt}</td>
                    <td>
                      <button
                        onClick={() => handleShowDetails(buch)}
                        className="btn btn-primary"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : result ? (
                <tr key={result.isbn}>
                  <td>{result.titel.titel}</td>
                  <td>{result.rating}</td>
                  <td>{result.art}</td>
                  <td>{result.preis} €</td>
                  <td>{result.rabatt}</td>
                  <td>
                    <button
                      onClick={() => handleShowDetails(result)}
                      className="btn btn-primary"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        )}
        {error && <p>{error}</p>}
        {result && Array.isArray(result) && result.length > 5 && (
          <div className="d-flex justify-content-center">
            <button
              onClick={handleToggleShowAllResults}
              className="btn btn-primary mt-4 hover-effect"
            >
              {showAllResults ? 'Weniger Ergebnisse' : 'Mehr Ergebnisse'}
            </button>
            <p className="ms-3 mt-4">{result.length} Ergebnisse insgesamt</p>
          </div>
        )}
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={handleCloseDetails}>
        <h2>Details</h2>
        {selectedBuch && (
          <table>
            <tr>
              <td>ISBN:</td>
              <td>{selectedBuch.isbn}</td>
            </tr>
            <tr>
              <td>Art:</td>
              <td>{selectedBuch.art}</td>
            </tr>
            <tr>
              <td>Rating:</td>
              <td>{selectedBuch.rating}</td>
            </tr>
            <tr>
              <td>Preis:</td>
              <td>{selectedBuch.preis}</td>
            </tr>
            <tr>
              <td>Rabatt:</td>
              <td>{selectedBuch.rabatt}</td>
            </tr>
            <tr>
              <td>Lieferbar:</td>
              <td>{selectedBuch.lieferbar ? 'Ja' : 'Nein'}</td>
            </tr>
            <tr>
              <td>Datum:</td>
              <td>{selectedBuch.datum}</td>
            </tr>
            <tr>
              <td>Homepage:</td>
              <td>{selectedBuch.homepage}</td>
            </tr>
            <tr>
              <td>Schlagwörter:</td>
              <td>
                {selectedBuch.schlagwoerter
                  ? selectedBuch.schlagwoerter.join(', ')
                  : ''}
              </td>
            </tr>
          </table>
        )}
        <button onClick={handleCloseDetails}>Schließen</button>
      </Modal>
      <Modal isOpen={isChartModalOpen} onRequestClose={handleCloseChartModal}>
        <div
          style={{
            display: 'left',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <button onClick={handleCloseChartModal}>Schließen</button>
          <SimpleBarChart />
        </div>
      </Modal>
    </div>
  );
}

function withAuth(Component: React.ComponentType) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
