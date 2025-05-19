import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Navbar";

const EstimadorRenovable = () => {
  const [paises, setPaises] = useState([]);
  const [pais, setPais] = useState("");
  const [anio, setAnio] = useState("2021");
  const [consumo, setConsumo] = useState("");
  const [resultado, setResultado] = useState(null);
  const [resultado1, setResultado1] = useState(null);
  const [resultado2, setResultado2] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/paises")
      .then(res => {
        setPaises(res.data.paises); 
      })
      .catch(() => setError("Error cargando países"));
  }, []);

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
      setError("Error al calcular. Verifica los datos.");
    }
  };

  return (
    <>
      <Header />
      <div className="container py-5 d-flex justify-content-center">
        <div className="card shadow p-4" style={{ maxWidth: "600px", width: "100%" }}>
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
              <strong>{resultado}%</strong> de tu consumo podría cubrirse con energía renovables<br />
              <strong>{resultado1}Kw</strong> estimado de tu consumo<br />
              <strong>{resultado2}%</strong> estimado de tu consumo a futuro<br />
            </div>
          )}

          {error && (
            <div className="alert alert-danger mt-4 text-center">{error}</div>
          )}
          <Link to="/" className="btn btn-primary">
            Regresar
          </Link>
        </div>
      </div>
    </>
  );
};

export default EstimadorRenovable;
