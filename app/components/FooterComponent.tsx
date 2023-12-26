import React from 'react';
import gmailLogo from './gmail.png';

export const Footer: React.FC = () => {
  return (
    <footer className="d-flex justify-content-center mt-5  box">
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <h3 style={{ color: 'darkred' }}> Drilon</h3>
              </td>
              <td>
                <a href="mailto:j.drilon99@gmail.com">
                  <img
                    src={gmailLogo}
                    alt="Email Logo"
                    style={{ height: '20px', width: '20px' }}
                  />
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <h3 style={{ color: 'darkred' }}> Tekin</h3>
              </td>
              <td>
                <a href="mailto:t.demir128@gmail.com">
                  <img
                    src={gmailLogo}
                    alt="Email Logo"
                    style={{ height: '20px', width: '20px' }}
                  />
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <h3 style={{ color: 'darkred' }}> Mazlum</h3>
              </td>
              <td>
                <a href="mailto:mazlum1034@h-k.de">
                  <img
                    src={gmailLogo}
                    alt="Email Logo"
                    style={{ height: '20px', width: '20px' }}
                  />
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <h3 style={{ color: 'darkred' }}> Achim</h3>
              </td>
              <td>
                <a href="mailto:achim@seelhorst.net">
                  <img
                    src={gmailLogo}
                    alt="Email Logo"
                    style={{ height: '20px', width: '20px' }}
                  />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          <h5>© 2023 SWE Projekt bei Prof. Jürgen Zimmermann</h5>
        </p>
      </div>
    </footer>
  );
};
