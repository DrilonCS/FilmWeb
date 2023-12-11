import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from '@remix-run/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { https, host, login, port} from '../constants';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const navigate = useNavigate();

  const navigateToSearch = () => {
    navigate('/search');
  };
  
  const navigateToCreate = () => {
    navigate('/create');
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const loginUser = async (username: string, password: string) => {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const response = await axios.post(
      `${https}${host}${port}${login}`,
      `username=${username}&password=${password}`,
      { headers },
    );
    return response.data.token;
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    loginUser(username, password)
    .then(token => {
      if (token) {
        setIsLoggedIn(true);
        localStorage.setItem('authToken', token);
      }
    })
    .catch(error => {
      setErrorMessage(error.response.data.message);
      setTimeout(() => setErrorMessage(null), 5000);
      setUsername('');
      setPassword('');
    });
  };

  const handleLogout = () => {
    setUsername('');
    setPassword('');
    setIsLoggedIn(false);
    localStorage.removeItem('authToken');
  };

  return (
    <div className="container">
        <header className="d-flex flex-column align-items-center justify-content-center py-3 mb-5">
            {!isLoggedIn && (
                <form onSubmit={handleSubmit} className="d-flex align-items-start">
                    <h1 className=" me-5 mb-3 ms-3 mt-4">Login</h1>
                    <div className="mb-3 me-3">
                        <label className="form-label">Username:</label>
                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                        {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    </div>
                    <div className="mb-3 me-3">
                        <label className="form-label">Password:</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary ms-3 mt-4">Login</button>
                </form>
            )}
        </header>
        {isLoggedIn && (
        <>
        <button onClick={handleLogout} style={{ backgroundColor: '#ff4f4f' }} className="btn btn-secondary">Logout</button>
        <button onClick={navigateToSearch} className="btn btn-primary ms-5">Suchen</button>
        <button onClick={navigateToCreate} className="btn btn-primary ms-5">Erstellen</button>
        </>
        )}
    </div>
  );
}