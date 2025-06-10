// src/app/page.tsx

"use client"

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [experience, setExperience] = useState(0);
  const [education, setEducation] = useState("Bachelor's");
  const [jobTitle, setJobTitle] = useState("Data Scientist");
  const [prediction, setPrediction] = useState<number | null>(null);

  const handlePredict = async () => {
    try {
      const response = await axios.post("http://localhost:8000/predict", {
        experience,
        education,
        job_title: jobTitle,
      });
      setPrediction(response.data.predicted_salary);
    } catch (error) {
      alert("Error fetching prediction");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>SALARY PREDICTION WEB APP</h1>
      <p>This model has an R² score of 0.86</p>

      <label>
        Years of Experience:
        <input
          type="number"
          value={experience}
          onChange={(e) => setExperience(parseFloat(e.target.value))}
        />
      </label>
      <br />

      <label>
        Education Level:
        <select value={education} onChange={(e) => setEducation(e.target.value)}>
          <option value="High School">High School</option>
          <option value="Bachelor's">Bachelor's</option>
          <option value="Master's">Master's</option>
          <option value="PhD">PhD</option>
        </select>
      </label>
      <br />

      <label>
        Job Title:
        <select value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}>
          <option value="Data Scientist">Data Scientist</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Product Manager">Product Manager</option>
          <option value="Marketing Analyst">Marketing Analyst</option>
        </select>
      </label>
      <br />

      <button onClick={handlePredict}>Predict Salary</button>

      {prediction !== null && (
        <h2>Predicted Salary: ${prediction}</h2>
      )}
    </div>
  );
}