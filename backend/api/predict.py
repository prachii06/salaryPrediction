
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel  #used pydantic model in order to except the JSON req from frontend
import pandas as pd
import pickle
import os

router = APIRouter()

# Load model and preprocessing tools
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

model_path = os.path.join(BASE_DIR, "models", "linear_model.pkl")
scaler_path = os.path.join(BASE_DIR, "models", "scaler.pkl")
feature_names_path = os.path.join(BASE_DIR, "models", "feature_names.pkl")

try:
    model = pickle.load(open(model_path, 'rb'))
    scaler = pickle.load(open(scaler_path, 'rb'))
    expected_columns = pickle.load(open(feature_names_path, 'rb'))
except Exception as e:
    raise RuntimeError(f"Error loading model files: {e}")

# using pydantic - defined structure
class InputData(BaseModel):
    experience: float
    education: str
    job_title: str

@router.post("/predict")
async def predict_salary(data: InputData):
    try:
        print("Input received:", data)

       
        input_data = pd.DataFrame({
            'Years of Experience': [data.experience],
            'Education Level': [data.education],
            'Job Title': [data.job_title]
        })

        print("DataFrame created:\n", input_data)

        # One-hot encode categorical features
        input_data = pd.get_dummies(input_data)
        print("After get_dummies:\n", input_data)

        # Reindex to match training feature set
        input_data = input_data.reindex(columns=expected_columns, fill_value=0)
        print("Reindexed Data:\n", input_data)

        # Scale numeric features
        input_data[['Years of Experience']] = scaler.transform(input_data[['Years of Experience']])
        print("Scaled Data:\n", input_data)

        #prediction
        prediction = model.predict(input_data)[0]
        print("Prediction:", prediction)

        return {"predicted_salary": round(float(prediction), 2)}

    except Exception as e:
        print(" Error occurred:", str(e))
        raise HTTPException(status_code=500, detail=str(e))



# @router.get("/options")
# def get_options():
#     csv_path = os.path.join(os.path.dirname(__file__), "../../data/Salary_Data.csv")
#     df = pd.read_csv(csv_path)
#     return {
#         "education_levels": df["Education Level"].dropna().unique().tolist(),
#         "job_titles": df["Job Title"].dropna().unique().tolist()
#     }