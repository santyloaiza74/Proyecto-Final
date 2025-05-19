import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Navbar";
import Footer from "../components/Footer";

const EstimadorRenovable = () => {
  const [paises, setPaises] = useState([]);
  const [pais, setPais] = useState("");
  const [anio, setAnio] = useState("2021");
  const [consumo, setConsumo] = useState("");
  const [resultado, setResultado] = useState(null);
  const [resultado1, setResultado1] = useState(null);
  const [resultado2, setResultado2] = useState(null);
  const [error, setError] = useState("");
  const [gifUrl, setGifUrl] = useState(null);

  // Obtener lista de países
  useEffect(() => {
    axios.get("http://localhost:8000/paises")
      .then(res => setPaises(res.data.paises))
      .catch(() => setError("Error cargando países"));
  }, []);
  // Cargar el GIF automáticamente al seleccionar un país
  useEffect(() => {
    if (pais) {
      axios.get(`http://localhost:8000/pais/${pais}`)
      .then(res=>setGifUrl(res.data))
      .catch(() => setError("Error cargando el GIF"));
    } else {
      setGifUrl(null);
    }
  }, [pais]);

  // Función para hacer el cálculo al presionar el botón
  const calcular = async () => {
    try {
      const res = await axios.post("http://localhost:8000/calcular", {
        pais: pais,
        anio: parseInt(anio),
        consumo_kwh: parseFloat(consumo)
      });
      setResultado(res.data.proporcion_renovable.toFixed(8));
      setResultado1(res.data.consumo_renovable_estimado.toFixed(8));
      setResultado2(res.data.porcentaje_estimado.toFixed(8));
      setError("");
    } catch (err) {
      setResultado(null);
      setResultado1(null);
      setResultado2(null);
      setError("Error al calcular. Verifica los datos.");
    }
  };

  return (
    <>
      <Header />
      <div className="container py-5 d-flex  align-items-center grid-graficos">
        {/* Estimador */}
        <div className="card shadow p-4 mb-4" style={{ maxWidth: "600px", width: "100%" }}>
          <h2 className="mb-4 text-center text-success">💡 Estimador de Energía Renovable</h2>
          <div className="mb-3">
            <label className="form-label fw-bold">🌍 País</label>
            <select className="form-select" value={pais} onChange={e => setPais(e.target.value)}>
              <option value="">-- Selecciona un país --</option>
              {paises.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">📅 Año</label>
            <input
              type="number"
              className="form-control"
              value={anio}
              max="2021"
              onChange={e => setAnio(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">⚡ Consumo eléctrico total (kWh)</label>
            <input
              type="number"
              className="form-control"
              value={consumo}
              onChange={e => setConsumo(e.target.value)}
              placeholder="Ej: 1200"
            />
          </div>

          <div className="d-grid">
            <button className="btn btn-success" onClick={calcular}>
              Calcular Proporción
            </button>
          </div>

          {resultado && (
            <div className="alert alert-info mt-4 text-center">
              <strong>{resultado}%</strong> de tu consumo podría cubrirse con energías renovables<br />
              <strong>{resultado1} kWh</strong> de energía renovable estimada<br />
              <strong>{resultado2}%</strong> estimado de cobertura futura<br />
            </div>
          )}

          {error && (
            <div className="alert alert-danger mt-4 text-center">{error}</div>
          )}

          <div className="mt-3 text-center">
            <Link to="/" className="btn btn-primary">Regresar</Link>
          </div>
        </div>

        {gifUrl && (
          <div className="card shadow p-4" style={{ maxWidth: "600px", width: "100%" }}>
            <h2 className="mb-4 text-center text-success">📊 Evolución Energética de {pais}</h2>
            <img
              src={gifUrl.file}
              alt={`GIF de evolución energética de ${pais}`}
              className="img-fluid rounded border"
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EstimadorRenovable;
