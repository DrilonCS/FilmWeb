import React, { useState } from 'react';
import { useApi } from '~/hooks/useGetApi';
import { https, host, port, rest } from '../constants';
import { useNavigate } from 'react-router-dom';
import { type BuchProps } from '~/types';
import Modal from 'react-modal';
import SimpleBarChart from './barchart';
import { withAuth } from '../components/AuthentificationComponent';
import { BuchTableRow } from '../components/BuchTableRowComponent';
import { Button } from '../components/ButtonComponent';
import { Footer } from '../components/Shared/FooterComponent';


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

  const handleGetBuecher = (id?: string, art?: string) => {
    const url = `${https}${host}${port}${rest}
      ${id || ''}
      ${art ? `?art=${art}` : ''}`;
    search(url);
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
      <div>
        <Button onClick={navigateToIndex} text="Zurück zur Startseite" classes="hover-effect ms-3 mt-4" />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <Button onClick={() => handleGetBuecher(id)} text="Suche mit ID" classes="ms-3 mt-4 hover-effect" />
        <Button onClick={() => handleGetBuecher()} text="Suche alle Buecher" classes="ms-3 mt-4 hover-effect" />
        <Button onClick={() => handleGetBuecher(undefined, art)} text="Suche nach Art" classes="ms-3 mt-4 hover-effect" />
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
        <Button onClick={() => handleOpenChartModal()} text="Statistik" classes="ms-3 mt-4 hover-effect" />
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
                {['Titel', 'Rating', 'Art', 'Preis', 'Rabatt', 'Details'].map((header) => (
                <th key={header} className="hover-effect">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(result) ? (
                result.slice(0, showAllResults ? result.length : 5).map((buch) => (
                  <BuchTableRow handleShowDetails={handleShowDetails} {...buch} />
                ))
              ) : result ? (
                  <BuchTableRow handleShowDetails={handleShowDetails} {...result} />
              ) : null}
            </tbody>
          </table>
        )}
        {error && <p>{error}</p>}
        {result && Array.isArray(result) && result.length > 5 && (
          <div className="d-flex justify-content-center">
            <Button onClick={() => handleToggleShowAllResults()} text={showAllResults ? 'Weniger Ergebnisse' : 'Mehr Ergebnisse'} classes="mt-4 hover-effect" />
            <p className="ms-3 mt-4">{showAllResults ? result.length : 5} von {result.length} Ergebnissen</p>
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
        <Button onClick={() => handleCloseDetails()} text="Schließen"/>
      </Modal>
      <Modal isOpen={isChartModalOpen} onRequestClose={handleCloseChartModal}>
        <div
          style={{
            display: 'left',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Button onClick={() => handleCloseChartModal()} text="Schließen"/>
          <SimpleBarChart />
        </div>
      </Modal>
      <Footer />
    </div>
  );
}

const ProtectedSearchPage = withAuth(SearchPage);
export default ProtectedSearchPage;
