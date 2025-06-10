# predict.py
from fastapi import APIRouter, HTTPException
import pandas as pd
import pickle
import os

router = APIRouter()

# Load model and preprocessing tools
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

model_path = os.path.join(BASE_DIR, "models", "linear_model.pkl")
encoder_path = os.path.join(BASE_DIR, "models", "one_hot_categories.pkl")
feature_names_path = os.path.join(BASE_DIR, "models", "feature_names.pkl")

try:
    model = pickle.load(open(model_path, 'rb'))
    encoder = pickle.load(open(encoder_path, 'rb'))
    feature_names = pickle.load(open(feature_names_path, 'rb'))
except Exception as e:
    raise RuntimeError(f"Error loading model files: {e}")

# @router.post("/predict")
# async def predict_salary(experience: float, education: str, job_title: str):
#     try:
#         # Prepare input data
#         input_data = pd.DataFrame({
#             'Years of Experience': [experience],
#             'Education Level': [education],
#             'Job Title': [job_title]
#         })

#         # Apply same preprocessing
#         prediction = model.predict(input_data)[0]

#         return {"predicted_salary": round(float(prediction), 2)}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

@router.post("/predict")
async def predict_salary(experience: float, education: str, job_title: str):
    try:
        # Log incoming input
        print("📥 Input received:", experience, education, job_title)

        input_data = pd.DataFrame({
            'Years of Experience': [experience],
            'Education Level': [education],
            'Job Title': [job_title]
        })

        print("📊 DataFrame created:\n", input_data)

        # One-hot encode
        input_data = pd.get_dummies(input_data)
        print("🧬 After get_dummies:\n", input_data)

        # Reindex to match training
        input_data = input_data.reindex(columns=expected_columns, fill_value=0)
        print("🔁 Reindexed Data:\n", input_data)

        # Scale numeric features
        input_data[['Years of Experience']] = scaler.transform(input_data[['Years of Experience']])
        print("📈 Scaled Data:\n", input_data)

        # Predict
        prediction = model.predict(input_data)[0]
        print("💰 Prediction:", prediction)

        return {"predicted_salary": round(float(prediction), 2)}
    except Exception as e:
        print("❌ Error occurred:", str(e))
        raise HTTPException(status_code=500, detail=str(e))