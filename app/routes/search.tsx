import { useNavigate } from 'react-router-dom';

export default function SearchPage() {

    const navigate = useNavigate();
  
    const navigateToIndex = () => {
      navigate('/');
    }

    return (
        <>
        <h1>SearchPage</h1>
        <button onClick={navigateToIndex}>Zurück zur Startseite</button>
        </>
    );

}