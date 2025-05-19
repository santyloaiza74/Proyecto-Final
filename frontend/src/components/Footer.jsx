import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/Footer.css'; 

const Footer = () => {
  return (
    <footer className="site-footer mt-5">
      <Container>
        <Row className="text-center text-md-left">
          <Col md={6}>
            <h5 className="footer-title">Energía Renovable</h5>
            <p>Promoviendo un futuro sostenible a través de fuentes limpias e inagotables.</p>
          </Col>
          <Col md={6} className="text-md-right mt-3 mt-md-0">
            <p>&copy; {new Date().getFullYear()} Proyecto Energías Limpias. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;