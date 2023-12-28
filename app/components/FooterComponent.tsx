import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="d-flex justify-content-center mt-5">
      <div>
        <p>Authors:
          <a href="mailto:j.drilon99@gmail.com">Drilon</a>,
          <a href="mailto:t.demir128@gmail.com">Tekin</a>,
          <a href="mailto:mazlum.solmaz01@outlook.de">Mazlum</a>,
          <a href="mailto:achim@seelhorst.net">Achim</a>
        </p>
        <p>SWE Projekt bei Prof. Jürgen Zimmermann</p>
      </div>
    </footer>
  );
};
