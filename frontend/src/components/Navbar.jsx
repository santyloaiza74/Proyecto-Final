import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const CustomNavbar = () => (
  <Navbar expand="lg" style={{ background: "#2563eb" }}>
    <Container>
      <Navbar.Brand href="/" style={{ color: "#fff", fontWeight: 700 }}>
        Energía Renovable
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/" style={{ color: "#fff" }}>Inicio</Nav.Link>
          <Nav.Link href="/Estimador" style={{ color: "#fff" }}>Estimador</Nav.Link>
          <Nav.Link href="/Graficos" style={{ color: "#fff" }}>Estadísticas</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default CustomNavbar;