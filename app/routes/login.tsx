import React, { useState } from 'react';
import { useNavigate } from '@remix-run/react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const navigate = useNavigate();

  const navigateToSearch = () => {
    navigate('/search');
  };

  const navigateToIndex = () => {
    navigate('/');
  }

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
    } else {
        if (username !== 'admin') {
            setUsernameError('Invalid username');
            setTimeout(() => setUsernameError(null), 5000);
            setUsername('');
        }

        if (password !== 'password') {
            setPasswordError('Invalid password');
            setTimeout(() => setPasswordError(null), 5000);
            setPassword('');
        }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="container">
        <header className="d-flex flex-column align-items-center justify-content-center bg-light py-3 mb-5">
            <h1 className="mb-3">Login</h1>
            {!isLoggedIn && (
                <form onSubmit={handleSubmit} className="d-flex align-items-center">
                    <div className="mb-3 me-3">
                        <label className="form-label">Username:</label>
                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                        {usernameError && <p className="text-danger">{usernameError}</p>}
                    </div>
                    <div className="mb-3 me-3">
                        <label className="form-label">Password:</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {passwordError && <p className="text-danger">{passwordError}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            )}
        </header>
        {isLoggedIn && (
            <>
                <button onClick={handleLogout} className="btn btn-secondary mt-5">Logout</button>
                <button onClick={navigateToSearch} className="btn btn-primary mt-5">Zum Suchformular</button>
            </>
        )}
    </div>
);
}