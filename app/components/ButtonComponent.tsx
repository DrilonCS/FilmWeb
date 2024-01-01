export const Button = ({ onClick, text, classes }: { onClick: () => void, text?: string, classes?: string }) => (
    <button onClick={onClick} className={`btn btn-primary ${classes}`}>
      {text}
    </button>
  );