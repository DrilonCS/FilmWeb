import React from 'react';
import './LoginStyleComponent';
import { Form, Button } from 'react-bootstrap';

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
    <Form onSubmit={handleSubmit} className="d-flex align-items-start">
      <h1 className="display-4 me-5 mb-3 ms-3 mt-3">Login:</h1>
      <Form.Group className="mb-3 me-3 position-relative">
        <Form.Label>Username:</Form.Label>
        <Form.Control 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          isInvalid={!!usernameError}
        />
        <Form.Control.Feedback type="invalid" style={{ position: 'absolute' }}>
          {usernameError}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3 me-3 position-relative">
        <Form.Label>Password:</Form.Label>
        <Form.Control 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          isInvalid={!!passwordError}
        />
        <Form.Control.Feedback type="invalid" style={{ position: 'absolute' }}>
          {passwordError}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" className="btn btn-primary ms-3 mt-4 hover-effect">
        Anmelden
      </Button>
    </Form>
  );
};