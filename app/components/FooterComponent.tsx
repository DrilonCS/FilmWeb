import React from 'react';
import gmailLogo from './gmail.png';
import { Container, Row, Col } from 'react-bootstrap';

export const Footer: React.FC = () => {
  return (
    <footer
      className="d-flex justify-content-center mt-5 "
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
      }}
    >
      <Container
        className="navbar"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '100%', // Set the width to 100% to match the page width
          backgroundColor: 'white',
          borderRadius: '5px',
          padding: '10px',
        }}
      >
        <Row
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%', // Adjusted width to take up the whole page
          }}
        >
          <Col style={{ display: 'flex', alignItems: 'center' }}>
            <h3 style={{ color: 'black', marginRight: '10px' }}> Drilon</h3>
            <a
              href="mailto:j.drilon99@gmail.com"
              style={{ marginRight: '15px' }}
            >
              <img
                src={gmailLogo}
                alt="Email Logo"
                style={{ height: '28px', width: '25px' }}
              />
            </a>
          </Col>
          <Col style={{ display: 'flex', alignItems: 'center' }}>
            <h3 style={{ color: 'black', marginRight: '10px' }}> Tekin</h3>
            <a
              href="mailto:t.demir128@gmail.com"
              style={{ marginRight: '15px' }}
            >
              <img
                src={gmailLogo}
                alt="Email Logo"
                style={{ height: '28px', width: '25px' }}
              />
            </a>
          </Col>
          <Col style={{ display: 'flex', alignItems: 'center' }}>
            <h3 style={{ color: 'black', marginRight: '10px' }}> Mazlum</h3>
            <a href="mailto:mazlum1034@h-k.de" style={{ marginRight: '15px' }}>
              <img
                src={gmailLogo}
                alt="Email Logo"
                style={{ height: '28px', width: '25px' }}
              />
            </a>
          </Col>
          <Col style={{ display: 'flex', alignItems: 'center' }}>
            <h3 style={{ color: 'black', marginRight: '10px' }}> Achim</h3>
            <a href="mailto:achim@seelhorst.net">
              <img
                src={gmailLogo}
                alt="Email Logo"
                style={{ height: '28px', width: '25px' }}
              />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
