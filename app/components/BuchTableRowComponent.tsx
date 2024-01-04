import { BuchProps } from '~/constants/types';
import { Button } from 'react-bootstrap';

interface BuchTableRowProps extends BuchProps {
  handleShowDetails: (buch: BuchProps) => void;
}

export const BuchTableRow = ({
  handleShowDetails,
  ...props
}: BuchTableRowProps) => (
  <tr key={props.isbn}>
    <td>{props.titel.titel}</td>
    <td>{props.rating}</td>
    <td>{props.art}</td>
    <td>{props.preis} €</td>
    <td>{props.rabatt}</td>
    <td>
      <Button
        onClick={() => handleShowDetails(props)}
        variant="primary"
      >
        Details
      </Button>
    </td>
  </tr>
);
