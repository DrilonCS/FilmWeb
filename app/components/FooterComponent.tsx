import React from 'react';
import gmailLogo from './gmail.png';


export const Footer: React.FC = () => {
  return (
    <footer className="d-flex justify-content-center mt-5 " style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', }}>
      <div className="navbar" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', backgroundColor: 'white', borderRadius: '5px', padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '25%' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ color: 'black', marginRight: '10px' }}> Drilon</h3>
        <a href="mailto:j.drilon99@gmail.com" style={{marginRight: '15px'}}>
          <img
            src={gmailLogo}
            alt="Email Logo"
            style={{ height: '28px', width: '25px' }}
          />
        </a>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ color: 'black', marginRight: '10px' }}> Tekin</h3>
        <a href="mailto:t.demir128@gmail.com" style={{marginRight: '15px'}}>
          <img
            src={gmailLogo}
            alt="Email Logo"
            style={{ height: '28px', width: '25px' }}
          />
        </a>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ color: 'black', marginRight: '10px' }}> Mazlum</h3>
        <a href="mailto:mazlum1034@h-k.de" style={{marginRight: '15px'}}>
          <img
            src={gmailLogo}
            alt="Email Logo"
            style={{ height: '28px', width: '25px' }}
          />
        </a>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ color: 'black', marginRight: '10px' }}> Achim</h3>
        <a href="mailto:achim@seelhorst.net">
          <img
            src={gmailLogo}
            alt="Email Logo"
            style={{ height: '28px', width: '25px' }}
          />
        </a>
      </div>
    </div>
  </div>
</footer>
  );
};