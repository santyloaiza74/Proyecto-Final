import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Navbar';

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
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
          Visualización de Gráficos de Energía Renovable
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Grafico nombre="Producción de Energía Renovable por Fuente" archivo={graficos.top10} />
          <Grafico nombre="Participación de Energías Renovables" archivo={graficos.torta} />
          <Grafico nombre="Capacidad Instalada por Fuente" archivo={graficos.lineas} />
          <Grafico nombre="Consumo Final de Energía" archivo={graficos.area} />
        </div>
      </div>
    </>
  );
};

const Grafico = ({ nombre, archivo }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-lg font-semibold mb-2">{nombre}</h2>
    <img src={archivo} alt={nombre} className="w-full rounded-md border" />
  </div>
);

export default Graficos;
