# test_prediction.py
import pandas as pd
import pickle

# Load model
model = pickle.load(open('models/linear_model.pkl', 'rb'))

# Simulate input
input_data = pd.DataFrame({
    'Years of Experience': [5],
    'Education Level': ['Master'],
    'Job Title': ['Data Scientist']
})

# Make prediction
prediction = model.predict(input_data)[0]
print("Prediction:", prediction)