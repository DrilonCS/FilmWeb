import { createGlobalStyle } from 'styled-components';
import React, { useEffect } from 'react';
import LoginPage from "./login";
import log from '../log.png'; // Pfad zur Logo-Datei

export const GlobalStyle = createGlobalStyle`
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
  .mt-4 {
    margin-top: 2rem !important;
}
`;

export default function Index() {
  useEffect(() => {
    const originalStyleHtml = window.getComputedStyle(document.documentElement).background;
    const originalStyleBody = window.getComputedStyle(document.body).background;
    document.documentElement.style.background = 'linear-gradient(#90AFC5, #3B7EA1)';
    document.body.style.background = 'linear-gradient(#90AFC5, #3B7EA1)';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    return () => {
      document.documentElement.style.background = originalStyleHtml;
      document.body.style.background = originalStyleBody;
      document.body.style.margin = '';
      document.body.style.padding = '';
    };
  }, []);

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