import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function asd() {
  return (
    <>
    <div>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src=""
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            React Bootstrap
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
    </>
  );
}