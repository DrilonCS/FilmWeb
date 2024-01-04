import React from 'react';
import { BuchProps } from '~/types';
import { Button } from 'react-bootstrap';

type BuchDetailsProps = {
  buch: BuchProps;
  onClose: () => void;
};

export const BuchDetailsComponent: React.FC<BuchDetailsProps> = ({
  buch,
  onClose,
}) => {
  const buchDetails = [
    { label: 'ISBN', value: buch.isbn },
    { label: 'Art', value: buch.art },
    { label: 'Rating', value: buch.rating },
    { label: 'Preis', value: buch.preis },
    { label: 'Rabatt', value: buch.rabatt },
    { label: 'Lieferbar', value: buch.lieferbar ? 'Ja' : 'Nein' },
    { label: 'Datum', value: buch.datum },
    { label: 'Homepage', value: buch.homepage },
    {
      label: 'Schlagwörter',
      value: buch.schlagwoerter ? buch.schlagwoerter.join(', ') : '',
    },
    { label: 'Titel', value: buch.titel.titel },
    { label: 'Untertitel', value: buch.titel.untertitel },
  ];

  return (
    <div>
      <Button
        variant="primary"
        onClick={onClose}
        style={{ position: 'absolute', top: '10px', right: '10px' }}
      >
        Schließen
      </Button>
      <h2>Details</h2>
      <table className="table table-hover">
        <tbody>
          {buchDetails.map((detail) => (
            <tr key={detail.label} style={{ cursor: 'pointer' }}>
              <td>{detail.label}:</td>
              <td>
                {detail.label === 'Homepage' ? (
                  <a href={detail.value?.toString() ?? ''}>
                    {detail.value?.toString() ?? ''}
                  </a>
                ) : (
                  detail.value
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
