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
    const expiresAt = localStorage.getItem('expiresAt');
    if (token && expiresAt && new Date().getTime() > Number(expiresAt)) {
      setIsLoggedIn(false);
      localStorage.removeItem('authToken');
      localStorage.removeItem('expiresAt');
    } else {
      setIsLoggedIn(!!token);
    }

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
    return response.data;
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    loginUser(username, password)
    .then(data => {
      if (data && data.token) {
        setIsLoggedIn(true);
        localStorage.setItem('authToken', data.token);
        const expiresAt = new Date().getTime() + data.expiresIn * 1000;
        localStorage.setItem('expiresAt', expiresAt.toString());
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
            <h1 style={{ fontSize: '3em' }}  className=" me-5 mb-3 ms-3 mt-3">Login:</h1>
            <div style={{ position: 'relative' }} className="mb-3 me-3">
              <label className="form-label">Username:</label>
              <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
              {errorMessage && <p style={{ position: 'absolute', color: 'red'}}>{errorMessage}</p>}
            </div>
            <div style={{ position: 'relative' }} className="mb-3 me-3">
              <label className="form-label">Password:</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
              {errorMessage && <p style={{ position: 'absolute', color: 'red'}}>{errorMessage}</p>}
            </div>
            <button type="submit" className="btn btn-primary ms-3 mt-4">Anmelden</button>
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
        <div className="d-flex justify-content-center mt-5">
          <div>
            <p>Authors: 
              <a href="mailto:j.drilon99@gmail.com">Drilon</a>, 
              <a href="mailto:t.demir128@gmail.com">Tekin</a>, 
              <a href="mailto:mazlum.solmaz01@outlook.de">Mazlum</a>, 
              <a href="mailto:achim@seelhorst.net">Achim</a>
            </p> 
            <p>SWE Projekt bei Prof. Jürgen Zimmermann</p>
          </div>
        </div>
      </div>
    
  );
}