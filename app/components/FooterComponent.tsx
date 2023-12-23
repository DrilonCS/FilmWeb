import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="d-flex justify-content-center mt-5">
      <div>
        <p> <h2>Authors :</h2>
          <br />
          <a href="mailto:j.drilon99@gmail.com" style={{ color: 'darkred' }}><h3> Drilon,</h3></a>
          <br />
          <a href="mailto:j.drilon99@gmail.com" style={{ color: 'darkred' }}><h3> Tekin,</h3></a>
          <br />
          <a href="mailto:j.drilon99@gmail.com" style={{ color: 'darkred' }}><h3> Achim,</h3></a>
          <br />
          <a href="mailto:j.drilon99@gmail.com" style={{ color: 'darkred' }}><h3> Mazlum</h3></a>
        </p>
        <p><h5>SWE Projekt bei Prof. Jürgen Zimmermann</h5></p>
      </div>
    </footer>
  );
};
