import { BuchProps } from '~/types';

interface BuchTableRowProps extends BuchProps {
    handleShowDetails: (buch: BuchProps) => void;
  }

export const BuchTableRow = ({ handleShowDetails, ...props }: BuchTableRowProps) => (
    <tr key={props.isbn}>
      <td>{props.titel.titel}</td>
      <td>{props.rating}</td>
      <td>{props.art}</td>
      <td>{props.preis} €</td>
      <td>{props.rabatt}</td>
      <td>
        <button
          onClick={() => handleShowDetails(props)}
          className="btn btn-primary"
        >
          Details
        </button>
      </td>
    </tr>
  );