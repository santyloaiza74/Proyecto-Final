import React from 'react';
import '../css/Footer.css';

const Footer = () => (
  <footer className="site-footer">
    <div className="container text-center">
      <div className="footer-title">Energía Renovable</div>
      <div>Impulsando un futuro más limpio y sostenible para todos.</div>
      <div style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
        &copy; {new Date().getFullYear()} Proyecto Final | Hecho con pasión por el planeta
      </div>
    </div>
  </footer>
);

export default Footer;