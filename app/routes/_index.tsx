import { createGlobalStyle } from 'styled-components';
import LoginPage from "./login";
import log from '../log.png'; // Pfad zur Logo-Datei

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(#90AFC5, #3B7EA1);
  }
  .center-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .login-logo {
    width: 400px; // Breite des Logos
    height: auto; // Höhe des Logos automatisch anpassen
    background: transparent; // Hintergrund des Logos transparent machen
  }
`;

export default function Index() {
  return (
    <>
      <GlobalStyle />
      <LoginPage />
      <div className="center-logo">
        <img src={log} alt="Login Logo" className="login-logo" />
      </div>
    </>
  );
}