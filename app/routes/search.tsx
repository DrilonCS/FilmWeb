import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
    const navigate = useNavigate();
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

    const navigateToIndex = () => {
        navigate('/');
    };

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: 'linear-gradient(#90AFC5, #3B7EA1)', 
            minHeight: '100vh' 
        }}>
            <h1>Suchformular</h1>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch} className="btn btn-primary" style={{ marginTop: '10px' }}>Suchen</button>
            <table>
                <thead>
                    <tr>
                        <th>Suchergebnisse</th>
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
            <button onClick={navigateToIndex} className="btn btn-primary" style={{ marginTop: '10px' }}>Zurück zur Startseite</button>
        </div>
    );
}

function withAuth(Component: React.ComponentType) {
    return function ProtectedRoute(props: any) {
      const navigate = useNavigate();
      const token = localStorage.getItem('authToken');
  
      if (!token) {
        navigate('/');
        return null;
      }
      return <Component {...props} />;
    };
  }

const ProtectedSearchPage = withAuth(SearchPage);

export default ProtectedSearchPage;