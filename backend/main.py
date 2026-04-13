from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import joblib
import pandas as pd

model = joblib.load("./model/notebooks/svc_best_model.pkl")
df = pd.read_csv("./model/data/Iris.csv", index_col="Id")
_, uniques = pd.factorize(df["Species"])


class IrisFeatures(BaseModel):
    sepal_length: float
    sepal_width: float
    petal_length: float
    petal_width: float


app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://starshipghost.github.io",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Iris classification API is running"}

@app.post("/prediction")
async def predict(features: IrisFeatures):
    X = pd.DataFrame(
        {
            "SepalLengthCm": [features.sepal_length],
            "SepalWidthCm": [features.sepal_width],
            "PetalLengthCm": [features.petal_length],
            "PetalWidthCm": [features.petal_width],
        }
    )
    species = uniques[model.predict(X)]
    return {"species": species[0].split("-")[1].title()}
