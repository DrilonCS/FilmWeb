import React, { useState } from 'react';
import { useNavigate } from '@remix-run/react';

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

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
    } else {
        if (username !== 'admin') {
            setUsernameError('Invalid username');
            setTimeout(() => setUsernameError(null), 5000);
        }

        if (password !== 'password') {
            setPasswordError('Invalid password');
            setTimeout(() => setPasswordError(null), 5000);
        }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      {!isLoggedIn ? (
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            {usernameError && <p>{usernameError}</p>}
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {passwordError && <p>{passwordError}</p>}
          </label>
          <input type="submit" value="Login" />
        </form>
      ) : (
        <>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={navigateToSearch}>Zum Suchformular</button>
        </>
      )}
    </div>
  );
}