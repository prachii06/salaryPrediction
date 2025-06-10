// src/app/page.tsx
"use client"

import { useState } from "react";

export default function Home() {
  const [experience, setExperience] = useState(0);
  const [education, setEducation] = useState("Bachelor");
  const [jobTitle, setJobTitle] = useState("Data Scientist");
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ experience, education, job_title: jobTitle }),
      });

      const data = await res.json();
      const salary = parseFloat(data.predicted_salary);

      if (!isNaN(salary)) {
        setPrediction(salary);
      } else {
        alert("Invalid prediction. Please try again.");
        setPrediction(null);
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching prediction");
      setPrediction(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">SALARY PREDICTION WEB APP</h1>
      <p className="mb-4">This model has an R² score of ~0.86</p>

      <form onSubmit={(e) => { e.preventDefault(); handlePredict(); }} className="flex flex-col gap-4 max-w-md">
        <label htmlFor="experience" className="font-semibold">
          Years of Experience:
          <input
            id="experience"
            type="number"
            value={experience}
            onChange={(e) => setExperience(parseFloat(e.target.value))}
            className="border border-gray-300 p-2 rounded-md w-full mt-1"
            required
          />
        </label>

        <label htmlFor="education" className="font-semibold">
          Education Level:
          <select
            id="education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full mt-1"
          >
            <option value="High School">High School</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
            <option value="PhD">PhD</option>
          </select>
        </label>

        <label htmlFor="jobTitle" className="font-semibold">
          Job Title:
          <select
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full mt-1"
          >
            <option value="Data Scientist">Data Scientist</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Product Manager">Product Manager</option>
            <option value="Marketing Analyst">Marketing Analyst</option>
          </select>
        </label>

        <button
          type="button"
          onClick={handlePredict}
          disabled={isLoading}
          className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Predicting..." : "Predict Salary"}
        </button>
      </form>

      {prediction !== null && !isNaN(prediction) && (
        <div className="mt-6 bg-green-100 border border-green-300 rounded-md p-4 shadow-md max-w-md">
          <h2 className="text-xl font-semibold mb-2">Predicted Salary:</h2>
          <p className="text-lg">${prediction.toFixed(2)}</p>
        </div>
      )}

      {prediction === null && (
        <p className="mt-6 text-red-500">Enter values and click Predict to see the result.</p>
      )}
    </div>
  );
}