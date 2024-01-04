import { useState } from 'react';
import { useApi } from '~/hooks/useGetApi';
import { REST_API_URL } from '../constants/constants';
import { useNavigate } from 'react-router-dom';
import { type BuchProps } from '~/constants/types';
import Modal from 'react-modal';
import SimpleBarChart from '../components/BarChartComponent';
import { withAuth } from '../components/AuthentificationComponent';
import { BuchTableRow } from '../components/BuchTableRowComponent';
import { Button } from '../components/ButtonComponent';
import { Footer } from '../components/FooterComponent';
import { BuchDetailsComponent } from '../components/BuchDetailsComponent';
import { Alert } from 'react-bootstrap';

function SearchPage() {
  // UseStates für die zu suchenden Daten
  const [id, setId] = useState('');
  const [art, setArt] = useState('');
  const {
    data: result,
    error,
    request: search,
    setData: setResult,
  } = useApi(REST_API_URL);
  const [selectedBuch, setSelectedBuch] = useState<BuchProps | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isChartModalOpen, setChartModalOpen] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);

  const navigate = useNavigate();

  // Funktion um zur Startseite zu navigieren
  const navigateToIndex = () => {
    navigate('/');
  };

  // Funktion zum Anfordern der Daten von der API
  const handleRequest = (url: string) => {
    setResult(null);
    search(url);
  };

  // Funktionen zum Anfordern von Büchern nach Art, ID oder alle Bücher
  const handleGetByArt = () => {
    handleRequest(`${REST_API_URL}?art=${art}`);
  };

  const handleGetId = () => {
    if (!id) {
      handleRequest(`${REST_API_URL}/UngültigeId`);
    } else {
      handleRequest(`${REST_API_URL}${id}`);
    }
  };

  const handleGetAllBuecher = () => {
    handleRequest(REST_API_URL);
  };

   // Funktionen zum Anzeigen und Schließen der Detail- und Chart-Modale
  const handleShowDetails = (buch: BuchProps) => {
    setSelectedBuch(buch);
    setModalIsOpen(true);
  };

  const handleCloseDetails = () => {
    setSelectedBuch(null);
    setModalIsOpen(false);
  };

  const handleOpenChartModal = () => {
    setChartModalOpen(true);
  };

  const handleCloseChartModal = () => {
    setChartModalOpen(false);
  };

    // Funktion zum Umschalten der Anzeige aller Ergebnisse
  const handleToggleShowAllResults = () => {
    setShowAllResults(!showAllResults);
  };

  return (
    <div
      style={{
        background: 'linear-gradient(#90AFC5, #3B7EA1)',
        minHeight: '100vh',
        marginBottom: '60px',
      }}
    >
      <div>
        <Button
          onClick={navigateToIndex}
          text="Zurück zur Startseite"
          classes="hover-effect ms-3 mt-4"
        />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <Button
          onClick={() => handleGetId()}
          text="Suche mit ID"
          classes="ms-3 mt-4 hover-effect"
        />
        <Button
          onClick={() => handleGetAllBuecher()}
          text="Suche alle Buecher"
          classes="ms-3 mt-4 hover-effect"
        />
        <Button
          onClick={() => handleGetByArt()}
          text="Suche nach Art"
          classes="ms-3 mt-4 hover-effect"
        />
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
        <Button
          onClick={() => handleOpenChartModal()}
          text="Statistik"
          classes="ms-3 mt-4 hover-effect"
        />
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
        {error && <Alert variant="danger">{error}</Alert>}
        {result && (
          <table
            className="table table-striped table-hover table-bordered"
            style={{ border: '2px solid black' }}
          >
            <thead className="table-dark">
              <tr>
                {['Titel', 'Rating', 'Art', 'Preis', 'Rabatt', 'Details'].map(
                  (header) => (
                    <th key={header} className="hover-effect">
                      {header}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(result) ? (
                result
                  .slice(0, showAllResults ? result.length : 5)
                  .map((buch) => (
                    <BuchTableRow
                      handleShowDetails={handleShowDetails}
                      {...buch}
                    />
                  ))
              ) : result ? (
                <BuchTableRow
                  handleShowDetails={handleShowDetails}
                  {...result}
                />
              ) : null}
            </tbody>
          </table>
        )}
        {result && Array.isArray(result) && result.length > 5 && (
          <div className="d-flex justify-content-center">
            <Button
              onClick={() => handleToggleShowAllResults()}
              text={showAllResults ? 'Weniger Ergebnisse' : 'Mehr Ergebnisse'}
              classes="mt-4 hover-effect"
            />
            <p className="ms-3 mt-4">
              {showAllResults ? result.length : 5} von {result.length}{' '}
              Ergebnissen
            </p>
          </div>
        )}
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={handleCloseDetails}>
        {selectedBuch && (
          <BuchDetailsComponent
            buch={selectedBuch}
            onClose={handleCloseDetails}
          />
        )}
      </Modal>
      <Modal isOpen={isChartModalOpen} onRequestClose={handleCloseChartModal}>
        <div
          style={{
            display: 'left',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Button onClick={() => handleCloseChartModal()} text="Schließen" />
          <SimpleBarChart data={result} />
        </div>
      </Modal>
      <Footer />
    </div>
  );
}

// Schützen der SearchPage mit Authentifizierung
const ProtectedSearchPage = withAuth(SearchPage);
export default ProtectedSearchPage;
