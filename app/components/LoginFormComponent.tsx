import React from 'react';

interface LoginFormProps {
  username: string;
  password: string;
  errorMessage: string | null;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  handleSubmit: (event: { preventDefault: () => void; }) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ username, password, errorMessage, setUsername, setPassword, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-start">
      <h1 style={{ fontSize: '3em' }} className="me-5 mb-3 ms-3 mt-3">Login:</h1>
      <div style={{ position: 'relative' }} className="mb-3 me-3">
        <label className="form-label">Username:</label>
        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
        {errorMessage && <p style={{ position: 'absolute', color: 'red' }}>{errorMessage}</p>}
      </div>
      <div style={{ position: 'relative' }} className="mb-3 me-3">
        <label className="form-label">Password:</label>
        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errorMessage && <p style={{ position: 'absolute', color: 'red' }}>{errorMessage}</p>}
      </div>
      <button type="submit" className="btn btn-primary ms-3 mt-4">Anmelden</button>
    </form>
  );
};