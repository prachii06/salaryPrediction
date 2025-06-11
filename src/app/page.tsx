"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [experience, setExperience] = useState(0);
  const [education, setEducation] = useState("Bachelor");
  const [jobTitle, setJobTitle] = useState("Data Scientist");
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const jobTitleOptions = [
    "Marketing Analyst",
    "Product Manager",
    "Sales Manager",
    "Software Engineer",
    "Data Analyst",
    "Senior Manager",
    "Sales Associate",
    "Director",
    "Recruiter",
    "Financial Manager",
    "Social Media Specialist",
    "Software Manager",
    "Junior Developer",
    "Senior Consultant",
    "Product Designer",
    "CEO",
    "Accountant",
    "Data Scientist",
    "Marketing Specialist",
    "Technical Writer",
    "HR Generalist",
    "Project Engineer",
    "Customer Success Rep",
    "Sales Executive",
    "UX Designer",
    "Operations Director",
    "Network Engineer",
    "Administrative Assistant",
    "Strategy Consultant",
    "Copywriter",
    "Account Manager",
    "Director of Marketing",
    "Senior Scientist",
    "Help Desk Analyst",
    "Customer Service Manager",
    "Business Intelligence Analyst",
    "Event Coordinator",
    "VP of Finance",
    "Graphic Designer",
    "UX Researcher",
    "Senior Engineer",
    "Social Media Manager",
    "HR Manager",
    "Senior Data Scientist",
    "Junior Accountant",
    "Digital Marketing Manager",
    "IT Manager",
    "Customer Service Representative",
    "Business Development Manager",
    "Senior Financial Analyst",
    "Web Developer",
    "Research Director",
    "Technical Support Specialist",
    "Creative Director",
    "Project Manager",
    "Operations Manager",
    "Senior Software Engineer",
    "Human Resources Director",
    "Content Marketing Manager",
    "Technical Recruiter",
    "Sales Representative",
    "Chief Technology Officer",
    "Junior Designer",
    "Financial Advisor",
    "Junior Account Manager",
    "Senior Project Manager",
    "Marketing Coordinator",
    "Principal Scientist",
    "Supply Chain Manager",
    "Senior Marketing Manager",
    "Business Analyst",
    "Training Specialist",
    "Research Scientist",
    "Junior Software Developer",
    "Public Relations Manager",
    "Operations Analyst",
    "Product Marketing Manager",
    "Senior HR Manager",
    "Junior Web Developer",
    "Senior Project Coordinator",
    "Chief Data Officer",
    "Digital Content Producer",
    "IT Support Specialist",
    "Senior Marketing Analyst",
    "Customer Success Manager",
    "Senior Graphic Designer",
    "Software Project Manager",
    "Supply Chain Analyst",
    "Senior Business Analyst",
    "Junior Marketing Analyst",
    "Office Manager",
    "Principal Engineer",
    "Junior HR Generalist",
    "Senior Product Manager",
    "Junior Operations Analyst",
    "Junior Web Designer",
    "Senior Training Specialist",
    "Junior Sales Representative",
    "Junior Data Analyst",
    "Senior Product Marketing Manager",
    "Junior Business Analyst",
    "Junior Software Developer",
    "Senior Sales Manager",
    "Junior Marketing Specialist",
    "Junior Project Manager",
    "Senior Accountant",
    "Director of Sales",
    "Junior Recruiter",
    "Senior Business Development Manager",
    "Senior Product Designer",
    "Junior Customer Support Specialist",
    "Senior IT Support Specialist",
    "Junior Financial Analyst",
    "Senior Operations Manager",
    "Director of Human Resources",
    "Junior Software Engineer",
    "Senior Sales Representative",
    "Director of Product Management",
    "Junior Copywriter",
    "Senior Marketing Coordinator",
    "Senior Human Resources Manager",
    "Junior Business Development Associate",
    "Senior Account Manager",
    "Senior Researcher",
    "Junior HR Coordinator",
    "Director of Finance",
    "Junior Marketing Coordinator",
    "Junior Data Scientist",
    "Senior Operations Analyst",
    "Senior Human Resources Coordinator",
    "Senior UX Designer",
    "Junior Product Manager",
    "Senior Marketing Specialist",
    "Senior IT Project Manager",
    "Senior Quality Assurance Analyst",
    "Director of Sales and Marketing",
    "Senior Account Executive",
    "Director of Business Development",
    "Junior Social Media Manager",
    "Senior Human Resources Specialist",
    "Senior Data Analyst",
    "Director of Human Capital",
    "Junior Advertising Coordinator",
    "Junior UX Designer",
    "Senior Marketing Director",
    "Senior IT Consultant",
    "Senior Financial Advisor",
    "Director of Engineering",
    "Senior Software Architect",
    "Junior Research Scientist",
    "Senior HR Manager",
    "Senior Data Engineer",
    "Junior Marketing Manager",
    "Junior Operations Coordinator",
    "Director of HR",
    "Senior Operations Coordinator",
    "Junior Financial Advisor",
    "Senior Human Resources Manager",
    "Junior HR Coordinator",
    "Senior Product Development Manager",
    "Junior Marketing Specialist",
    "Junior Business Development Associate",
    "Junior Marketing Analyst",
    "Junior Product Manager",
    "Junior Project Manager",
    "Junior Operations Analyst",
    "Junior Financial Analyst",
    "Junior Business Analyst",
    "Junior Operations Manager"
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-indigo-900 mb-2">Salary Prediction</h1>
            <p className="text-indigo-600">Discover your potential earnings based on your profile</p>
            <div className="mt-4 bg-indigo-100 inline-block px-3 py-1 rounded-full text-sm font-semibold text-indigo-800">
              Model R² score: 0.86
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handlePredict(); }} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <input
                  id="experience"
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900"
                  required
                  min="0"
                  step="0.5"
                />
              </div>

              <div>
                <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                  Education Level
                </label>
                <select
                  id="education"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-white text-gray-900"
                >
                  <option value="Bachelor">Bachelor's Degree</option>
                  <option value="Master">Master's Degree</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>

              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <select
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-white text-gray-900"
                >
                  {Array.from(new Set(jobTitleOptions)).map((job) => (
                    <option key={job} value={job}>{job}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-150 ease-in-out ${
                isLoading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Predicting...
                </span>
              ) : (
                "Predict Salary"
              )}
            </button>
          </form>

          {prediction !== null && !isNaN(prediction) && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-200 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Predicted Salary</h2>
              <p className="text-3xl font-bold text-green-600">{prediction.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
              <p className="mt-2 text-sm text-gray-600">Based on your input parameters</p>
            </div>
          )}

          {prediction === null && !isLoading && (
            <div className="mt-8 p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-blue-800">Fill in your details and click "Predict Salary" to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}