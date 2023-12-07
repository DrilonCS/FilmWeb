import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
=======
import { useState } from 'react';

>>>>>>> b22c10af973705b1e4bd4fb05808039293bed7b6

export default function SearchPage() {
    const navigate = useNavigate();
<<<<<<< HEAD
=======
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [showMore, setShowMore] = useState(false);

    const handleSearch = () => {
        // Perform search logic here using the searchTerm
        // and update the searchResults state with the results
        // For now, let's assume searchResults is an array of strings
        const results = ['Result 1', 'Result 2', 'Result 3', 'Result 4', 'Result 5'];
        setSearchResults(results);
    };

    const handleShowMore = () => {
        setShowMore(true);
    };
>>>>>>> b22c10af973705b1e4bd4fb05808039293bed7b6

    const navigateToIndex = () => {
        navigate('/');
    };

    return (
        <>
<<<<<<< HEAD
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
=======
            <h1>SearchPage</h1>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <table>
                <thead>
                    <tr>
                        <th>Search Results</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults.slice(0, showMore ? 10 : 5).map((result, index) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'white' : 'gray' }}>
                            <td>{result}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {!showMore && searchResults.length > 5 && (
                <button onClick={handleShowMore}>Show More</button>
            )}
            <button onClick={navigateToIndex}>Zurück zur Startseite</button>
>>>>>>> b22c10af973705b1e4bd4fb05808039293bed7b6
        </>
    );
}