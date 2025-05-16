from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from gif import create_gif
from graficos import generar_todos_los_graficos
import pandas as pd
import os
from fastapi import HTTPException
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
@app.get("/")
def read_root():
    return {"Hello": "World"}
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
        output_path = os.path.join("./public/", "graficos/")
        # Crear el directorio de salida si no existe

        os.makedirs(output_path, exist_ok=True)
        generar_todos_los_graficos(output_path)
        return {"message": "Gráficos generados exitosamente.", "torta": f"http://localhost:8000/public/graficos/grafico_torta_renovables.gif", "top10": f"http://localhost:8000/public/graficos/grafico_top_10_renovables.gif", "top 10 paises": f"http://localhost:8000/public/graficos/grafico_top_10_paises_renovables.gif"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))