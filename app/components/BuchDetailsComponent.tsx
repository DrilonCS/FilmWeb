import React from 'react';
import { BuchProps } from '~/types';

type BuchDetailsProps = {
  buch: BuchProps;
  onClose: () => void;
};

export const BuchDetailsComponent: React.FC<BuchDetailsProps> = ({ buch, onClose }) => {
  const buchDetails = [
    { label: 'ISBN', value: buch.isbn },
    { label: 'Art', value: buch.art },
    { label: 'Rating', value: buch.rating },
    { label: 'Preis', value: buch.preis },
    { label: 'Rabatt', value: buch.rabatt },
    { label: 'Lieferbar', value: buch.lieferbar ? 'Ja' : 'Nein' },
    { label: 'Datum', value: buch.datum },
    { label: 'Homepage', value: buch.homepage },
    { label: 'Schlagwörter', value: buch.schlagwoerter ? buch.schlagwoerter.join(', ') : '' },
    { label: 'Titel', value: buch.titel.titel },
    { label: 'Untertitel', value: buch.titel.untertitel },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>x</span>
        </button>
      </div>
      <h2>Details</h2>
      <table>
        {buchDetails.map((detail) => (
          <tr key={detail.label}>
            <td>{detail.label}:</td>
            <td>{detail.value}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};