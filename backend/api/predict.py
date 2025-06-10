from fastapi import APIRouter, HTTPException
import pandas as pd 
import pickle 
import os

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))



model_path = os.path.join(BASE_DIR,"models","linear_model.pkl")
scaler_path = os.path.join(BASE_DIR, "models", "scaler.pkl")
columns_path = os.path.join(BASE_DIR, "models", "one_hot_categories.pkl")

with open(model_path,'rb') as f:
    model = pickle.load(f)

with open(scaler_path,'rb') as f:
    scaler = pickle.load(f)

with open(columns_path,'rb') as f:
    expected_columns = pickle.load(f)


@router.post("/predict")
async def predict_salary(experience: float, education:str, job_title: str):
    try:
        input_data = pd.DataFrame({
            'Years of Experience': [experience],
            'Education Level': [education],
            'Job Title': [job_title]
        })

        input_data = pd.get_dummies(input_data,columns=['Education Level', 'Job Title'])
        for col in expected_columns :
            if col not in input_data.columns:
                input_data[col] = 0

        input_data = input_data.reindex(columns=expected_columns,fill_value= 0)
        input_data[['Years of Experience']] = scaler.transform(input_data[['Years of Experience']])

        prediction = model.predict(input_data)[0]
        return {"predicted_salary": round(prediction, 2)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))