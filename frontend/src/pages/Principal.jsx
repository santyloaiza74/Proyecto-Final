import React, { useEffect, useState } from "react";
import axoiss from "axios";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Card, CardBody, CardTitle, Spinner } from "react-bootstrap";
function Principal() {
  const [data, setData] = useState([]);
  const [opciones, setOpciones] = useState([]);
  const [loading, setLoading] = useState(true);
  // Lista de valores
  useEffect(() => {
    axoiss
      .get("http://localhost:8000/paises")
      .then((response) => {
        setOpciones(response.data.paises);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  // Estado para almacenar la opción seleccionada
  const [seleccionado, setSeleccionado] = useState("");

  // Manejar el cambio de selección
  const manejarCambio = (event) => {
    let valor = event.target.value;
    setSeleccionado(valor);
    setLoading(true);
    axoiss
      .get(`http://localhost:8000/pais/${valor}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div>
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="../../public/vite.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              React Bootstrap
            </Navbar.Brand>
          </Container>
        </Navbar>
      </div>
      <div>
        <label htmlFor="pais">Selecciona un país:</label>
        <select id="pais" value={seleccionado} onChange={manejarCambio}>
          <option value="">-- Selecciona una opción --</option>
          {opciones.map((opcion, index) => (
            <option key={index} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        ) : (
          <Card>
            <CardBody>
              <CardTitle tag="h5">Grafico del pais</CardTitle>
              <img src={data.file} alt={`GIF de ${seleccionado}`} />
            </CardBody>
          </Card>
        )}
      </div>
    </>
  );
}
export default Principal;
