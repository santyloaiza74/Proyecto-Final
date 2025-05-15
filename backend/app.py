from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from gif import create_gif
import pandas as pd
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