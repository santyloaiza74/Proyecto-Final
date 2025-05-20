from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from gif import create_gif
from graficos import generar_todos_los_graficos
import pandas as pd
import os
from fastapi import HTTPException
from pydantic import BaseModel
#middleware
app = FastAPI()

origins = [
    "http://localhost:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.mount("/public", StaticFiles(directory="public"), name="public")

# Cargar los archivos CSV
CSV_DIR = "./data/"

csv_files = {
    "solar": "12 solar-energy-consumption.csv",
    "wind": "08 wind-generation.csv",
    "hydro": "05 hydropower-consumption.csv",
    "geothermal": "17 installed-geothermal-capacity.csv"
}

data = {}

for key, filename in csv_files.items():
    path = os.path.join(CSV_DIR, filename)
    try:
        df = pd.read_csv(path)
        data[key] = df
    except Exception as e:
        print(f"Error cargando {filename}: {e}")

class CalculoInput(BaseModel):
    pais: str
    anio: int
    consumo_kwh: float

class CalculoOutput(BaseModel):
    proporcion_renovable: float
    consumo_renovable_estimado: float
    porcentaje_estimado: float

#Rutas
@app.get("/pais/{pais}")
def read_item(pais: str):
    response=create_gif(pais)
    return response
#python -m uvicorn app:app --reload
@app.get("/paises")
def get_paises():
    # Cargar el archivo CSV
    df = pd.read_csv("./data/01 renewable-share-energy.csv")
    # Obtener la lista de países únicos
    paises = df["Entity"].unique().tolist()
    return {"paises": paises}
@app.get("/principal")
def generar_graficos():
    try:
        # retornar si los graficos ya existen
        if os.path.exists("./public/graficos/grafico_torta_renovables.gif") and os.path.exists("./public/graficos/top10_renovables_2022.gif") and os.path.exists("./public/graficos/grafico_area_consumo.gif") and os.path.exists("./public/graficos/grafico_lineas_capacidad_instalada.gif"):
            return {"message": "Gráficos ya existen", 
                    "torta": f"http://localhost:8000/public/graficos/grafico_torta_renovables.gif", 
                    "top10": f"http://localhost:8000/public/graficos/top10_renovables_2022.gif",
                    "lineas": f"http://localhost:8000/public/graficos/grafico_lineas_capacidad_instalada.gif",
                    "area": f"http://localhost:8000/public/graficos/grafico_area_consumo.gif"}
        output_path = os.path.join("./public/", "graficos/")
        # Crear el directorio de salida si no existe

        os.makedirs(output_path, exist_ok=True)
        generar_todos_los_graficos(output_path)
        return {"message": "Gráficos generados exitosamente.", 
                "torta": f"http://localhost:8000/public/graficos/grafico_torta_renovables.gif", 
                "top10": f"http://localhost:8000/public/graficos/top10_renovables_2022.gif",
                "lineas": f"http://localhost:8000/public/graficos/grafico_lineas_capacidad_instalada.gif",
                "area": f"http://localhost:8000/public/graficos/grafico_area_consumo.gif"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/calcular", response_model=CalculoOutput)
def calcular(datos: CalculoInput):
    total_renovable = 0.0
    for df in data.values():
        if 'Entity' not in df.columns or 'Year' not in df.columns:
            continue

        df_filtrado = df[(df['Entity'] == datos.pais) & (df['Year'] == datos.anio)]

        if not df_filtrado.empty:
            # Busca una columna numérica que represente consumo o capacidad
            for col in df_filtrado.columns:
                if col not in ['Entity', 'Year'] and pd.api.types.is_numeric_dtype(df_filtrado[col]):
                    valor = df_filtrado[col].values[0]
                    if pd.notna(valor):
                        total_renovable += valor
                        break

    if total_renovable == 0:
        raise HTTPException(status_code=404, detail="Datos insuficientes para el cálculo")

    proporcion = total_renovable / 100  
    consumo_renovable = proporcion * datos.consumo_kwh
    porcentaje = (consumo_renovable / datos.consumo_kwh) * 100 if datos.consumo_kwh > 0 else 0.0
    return CalculoOutput(
        proporcion_renovable=proporcion,
        consumo_renovable_estimado=consumo_renovable,
        porcentaje_estimado=porcentaje
    )