import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../css/Graficos.css';
import Footer from '../components/Footer';

const nombresGraficos = {
  top10: "Producción de Energía Renovable por Fuente (Animado)",
  torta: "Participación de Energías Renovables en el Consumo Eléctrico",
  lineas: "Evolución de la Capacidad Instalada de Energías Renovables",
  area: "Comparativa de Consumo: Renovable vs Convencional"
};

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
      <Navbar />
      <div className="container-graficos">
        <h1 className="titulo-principal">
          Visualización de Gráficos de Energía Renovable
        </h1>
        <div className="grid-graficos">
          <Grafico nombre={nombresGraficos.top10} archivo={graficos.top10} />
          <Grafico nombre={nombresGraficos.torta} archivo={graficos.torta} />
          <Grafico nombre={nombresGraficos.lineas} archivo={graficos.lineas} />
          <Grafico nombre={nombresGraficos.area} archivo={graficos.area} />
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
