import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Row, Col } from 'react-bootstrap';
import Header from "./../components/Navbar";
import Footer from '../components/Footer';

const InfoEnergia = () => {
  return (
    <>
      <Header />
      <div>
        <Container className="my-5">
          <h1 className="text-center mb-4 text-success">Energía Solar</h1>
          <Row>
            <Col md={6}>
              <Card className="mb-4 shadow">
                <Card.Img variant="top" src="../../public/Solar2.avif" />
                <Card.Body>
                  <Card.Title>¿Qué es la energía solar?</Card.Title>
                  <Card.Text>
                    La energía solar es una fuente de energía renovable que se obtiene al capturar la radiación del sol mediante paneles solares u otras tecnologías. Es una solución limpia, silenciosa y sostenible que permite generar electricidad o calor sin afectar al medio ambiente.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="mb-4 shadow">
                <Card.Body>
                  <Card.Title>Principales Ventajas</Card.Title>
                  <ul>
                    <li>Es una fuente inagotable y ampliamente disponible.</li>
                    <li>No produce emisiones contaminantes ni residuos tóxicos.</li>
                    <li>Reduce significativamente los costos de electricidad a largo plazo.</li>
                    <li>Ideal para zonas aisladas sin acceso a la red eléctrica.</li>
                  </ul>

                  <Card.Title className="mt-4">Aplicaciones Comunes</Card.Title>
                  <ul>
                    <li>Generación de electricidad residencial, comercial e industrial.</li>
                    <li>Calentadores solares de agua para uso doméstico.</li>
                    <li>Iluminación solar para espacios públicos y rurales.</li>
                    <li>Alimentación de sistemas de riego agrícola.</li>
                  </ul>
                </Card.Body>
              </Card>

              <Card className="mb-4 shadow">
                <Card.Body>
                  <Card.Title>Innovaciones Tecnológicas</Card.Title>
                  <ul>
                    <li>Paneles solares bifaciales que aprovechan la luz directa y reflejada.</li>
                    <li>Tejas solares integradas que combinan diseño y funcionalidad.</li>
                    <li>Almacenamiento con baterías de litio y tecnologías inteligentes.</li>
                    <li>Seguimiento solar automático para maximizar la captación de energía.</li>
                  </ul>

                  <Card.Title className="mt-4">Aplicaciones Futuras</Card.Title>
                  <ul>
                    <li>Estaciones de carga solar para vehículos eléctricos.</li>
                    <li>Microredes solares para comunidades autosostenibles.</li>
                    <li>Sistemas híbridos solares-eólicos en zonas remotas.</li>
                    <li>Integración en infraestructura urbana inteligente.</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default InfoEnergia;
