import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SearchPage() {

    const navigate = useNavigate();

    const navigateToIndex = () => {
      navigate('/');
    }

    return (
        <>
            <header className="d-flex justify-content-center align-items-center bg-light py-3 mb-5">
                <h1>SearchPage</h1>
            </header>
            <form className="mb-3">
                <div className="mb-3 col-md-6">
                    <label htmlFor="search" className="form-label">Search:</label>
                    <input type="text" id="search" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <button onClick={navigateToIndex} className="btn btn-secondary">Zurück zur Startseite</button>
        </>
    );

}