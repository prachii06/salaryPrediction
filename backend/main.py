from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.predict import router as predict_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_methods = ["*"],
    allow_headers = ["*"],
)

app.include_router(predict_router)

@app.get("/")
def read_root():
    return {"messsage":"salary prediction api is running"}