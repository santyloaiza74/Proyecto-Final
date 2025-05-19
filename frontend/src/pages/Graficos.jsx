import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Navbar';
import '../css/Graficos.css';
import Footer from '../components/Footer';

const Graficos = () => {
  const [graficos, setGraficos] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/principal')
      .then(res => setGraficos(res.data))
      .catch(err => console.error("Error al obtener los gráficos", err));
  }, []);

  if (!graficos) {
    return (
      <div className="text-center p-10 text-gray-600">
        Cargando gráficos...
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container-graficos">
        <h1 className="titulo-principal">
          Visualización de Gráficos de Energía Renovable
        </h1>
        <div className="grid-graficos">
          <Grafico nombre="Producción de Energía Renovable por Fuente" archivo={graficos.top10} />
          <Grafico nombre="Participación de Energías Renovables" archivo={graficos.torta} />
          <Grafico nombre="Capacidad Instalada por Fuente" archivo={graficos.lineas} />
          <Grafico nombre="Consumo Final de Energía" archivo={graficos.area} />
        </div>
      </div>
      <Footer />
    </>
  );
};

const Grafico = ({ nombre, archivo }) => (
  <div className="card-grafico">
    <h2 className="card-titulo">{nombre}</h2>
    <img src={archivo} alt={nombre} className="card-imagen"/>
  </div>
);

export default Graficos;
