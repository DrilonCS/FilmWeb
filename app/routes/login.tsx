import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from '@remix-run/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LOGIN_API_URL } from '../constants/constants';
import logo from '../../public/images/log.png';
import { LoginForm } from '../components/LoginFormComponent';
import { UserActions } from '../components/LoginActionsComponent';
import { Footer } from '../components/FooterComponent';
import { handleLoginError } from '../handler/handleError';

export function LoginPage() {
  // Verwendung von useState-Hooks für verschiedene Zustände
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // useNavigate Hook um die Navigation zu steuern
  const navigate = useNavigate();

  // Funktion um zur Suchseite zu navigieren
  const navigateToSearch = () => {
    navigate('/search');
  };

  // Funktion um zur Create Seite zu navigieren
  const navigateToCreate = () => {
    navigate('/create');
  };

  // UseEffect Hook um zu prüfen ob der Benutzer eingeloggt ist
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const expiresAt = localStorage.getItem('expiresAt');
    if (token && expiresAt && new Date().getTime() > Number(expiresAt)) {
      setIsLoggedIn(false);
      localStorage.removeItem('authToken');
      localStorage.removeItem('expiresAt');
    } else if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Funktion zur Anmeldung des Benutzers
  const loginUser = async (username: string, password: string) => {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const response = await axios.post(
      LOGIN_API_URL,
      `username=${username}&password=${password}`,
      { headers },
    );
    return response.data;
  };

  // Funktion zum Verarbeiten des Formulars
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    loginUser(username, password)
      .then((data) => {
        if (data && data.token) {
          setIsLoggedIn(true);
          localStorage.setItem('authToken', data.token);
          const expiresAt = new Date().getTime() + data.expiresIn * 1000;
          localStorage.setItem('expiresAt', expiresAt.toString());
        }
      })
      .catch((err) =>
        handleLoginError(
          setUsernameError,
          setPasswordError,
          username,
          password,
          err,
        ),
      );
  };

  // Funktion zum Ausloggen des Benutzers
  const handleLogout = () => {
    setUsername('');
    setPassword('');
    setIsLoggedIn(false);
    localStorage.removeItem('authToken');
  };

  // Rendern der Komponente
  return (
    <div
      style={{
        background: 'linear-gradient(#90AFC5, #3B7EA1)',
        minHeight: '100vh',
      }}
    >
      <div className="container">
        <header className="d-flex flex-column align-items-center justify-content-center py-3 mb-5 border-bottom">
          {!isLoggedIn && (
            <LoginForm
              username={username}
              password={password}
              usernameError={usernameError}
              passwordError={passwordError}
              setUsername={setUsername}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
            />
          )}
          {isLoggedIn && (
            <>
              <UserActions
                handleLogout={handleLogout}
                navigateToSearch={navigateToSearch}
                navigateToCreate={navigateToCreate}
              />
            </>
          )}
        </header>
        <main className="d-flex justify-content-center mt-5">
          <img src={logo} alt="Logo" className="login-logo" />
        </main>
        <Footer />
      </div>
    </div>
  );
}
