import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(#90AFC5, #3B7EA1);
  }
  .center-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0vh;
  }
  .login-logo {
    width: 400px; // Breite des Logos
    height: auto; // Höhe des Logos automatisch anpassen
    background: transparent; // Hintergrund des Logos transparent machen
  }
  .mt-4 {
    margin-top: 2rem !important;
}
`;
