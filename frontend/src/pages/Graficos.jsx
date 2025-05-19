import React, {useEffect} from 'react';
import axios from "axios";
import Header from '../components/Navbar';



const Graficos = () => {


    const graficos = [
    {
      nombre: 'Producción de Energía Renovable por Fuente',
      archivo: '/gifs/top10_renovables_2022.gif',
    },
    {
      nombre: 'Participación de Energías Renovables',
      archivo: '/gifs/grafico_torta_renovables.gif',
    },
    
  ];

  return (
    <>
    <Header/>
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
        Visualización de Gráficos de Energía Renovable
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {graficos.map((grafico, index) => (
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold mb-2">{grafico.nombre}</h2>
                <img src={grafico.archivo} alt={grafico.nombre} className="w-full rounded-md border" />
            </div>          
        ))}
      </div>
    </div>
    </>
  );
};

export default Graficos;
