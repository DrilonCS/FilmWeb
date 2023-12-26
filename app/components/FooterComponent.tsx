import React from 'react';
import gmailLogo from './gmail.png';

export const Footer: React.FC = () => {
  return (
    <footer className='d-flex justify-content-center mt-5'>
      <div>
        <p>
          <h2>Authors :</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <a href='mailto:j.drilon99@gmail.com' style={{ display: 'flex', alignItems: 'center' }}>
              <img src={gmailLogo} alt="Email Logo" style={{ height: '20px', width: '20px' }} />
              <h3 style={{ color: 'darkred' }}> Drilon,</h3>
            </a>
            <a href='mailto:j.drilon99@gmail.com' style={{ display: 'flex', alignItems: 'center' }}>
              <img src={gmailLogo} alt="Email Logo" style={{ height: '20px', width: '20px' }} />
              <h3 style={{ color: 'darkred' }}> Tekin,</h3>
            </a>
            <a href='mailto:j.drilon99@gmail.com' style={{ display: 'flex', alignItems: 'center' }}>
              <img src={gmailLogo} alt="Email Logo" style={{ height: '20px', width: '20px' }} />
              <h3 style={{ color: 'darkred' }}> Achim,</h3>
            </a>
            <a href='mailto:j.drilon99@gmail.com' style={{ display: 'flex', alignItems: 'center' }}>
              <img src={gmailLogo} alt="Email Logo" style={{ height: '20px', width: '20px' }} />
              <h3 style={{ color: 'darkred' }}> Mazlum</h3>
            </a>
          </div>
        </p>
        <p><h5>SWE Projekt bei Prof. Jürgen Zimmermann</h5></p>
      </div>
    </footer>
  );
};
