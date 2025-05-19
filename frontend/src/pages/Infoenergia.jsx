import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Header  from "./../components/Navbar";

const InfoEnergia = () => {
  return (
    <>
      <Header />
      <div>
        <Container className="my-5">
          <h1 className="text-center mb-4">Energía Solar</h1>
          <Row>
            <Col md={6}>
              <Card className="mb-4 shadow">
                <Card.Img variant="top" src="../../public/Sarnia_Solar-09.jpg" />
                <Card.Body>
                  <Card.Title>¿Qué es?</Card.Title>
                  <Card.Text>
                    La energía solar es una fuente de energía renovable que se obtiene del aprovechamiento de la radiación electromagnética del sol. Es limpia, abundante y no genera emisiones contaminantes.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-4 shadow">
                <Card.Body>
                  <Card.Title>Ventajas</Card.Title>
                  <ul>
                    <li>Es inagotable y disponible en todo el planeta.</li>
                    <li>No emite gases de efecto invernadero.</li>
                    <li>Reduce la factura de electricidad.</li>
                    <li>Fácil de instalar en hogares y comunidades.</li>
                  </ul>
                  <Card.Title>Aplicaciones</Card.Title>
                  <ul>
                    <li>Generación eléctrica doméstica e industrial</li>
                    <li>Calentamiento de agua</li>
                    <li>Sistemas fotovoltaicos para zonas rurales</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default InfoEnergia;
