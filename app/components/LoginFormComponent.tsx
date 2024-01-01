import React from 'react';
import './loginStyles.css';

interface LoginFormProps {
  username: string;
  password: string;
  usernameError: string | null;
  passwordError: string | null;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  handleSubmit: (event: { preventDefault: () => void }) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  username,
  password,
  usernameError,
  passwordError,
  setUsername,
  setPassword,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-start">
      <h1 style={{ fontSize: '3em' }} className="me-5 mb-3 ms-3 mt-3">
        Login:
      </h1>
      <div style={{ position: 'relative' }} className="mb-3 me-3">
        <label className="form-label">Username:</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {usernameError && (
          <p style={{ position: 'absolute', color: 'red' }}>{usernameError}</p>
        )}
      </div>
      <div style={{ position: 'relative' }} className="mb-3 me-3">
        <label className="form-label">Password:</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && (
          <p style={{ position: 'absolute', color: 'blue' }}>{passwordError}</p>
        )}
      </div>
      <button type="submit" className="btn btn-primary ms-3 mt-4 hover-effect">
        Anmelden
      </button>
    </form>
  );
};
