import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function YearSelection() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const navigate = useNavigate();
  
    const currentYear = new Date().getFullYear();
    const startYear = 2017;
  
    // Generate array of years from 2017 to current year
    const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);
  
 
  const handleYearSelect = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleSubmit = () => {
    // Redirect to dashboard or data page with selected year
    navigate(`/`);
    localStorage.setItem("selectedYear", JSON.stringify(selectedYear));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Select Year</h1>
      <select
        value={selectedYear}
        onChange={handleYearSelect}
        className="p-2 border rounded-md"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Continue
      </button>
    </div>
  );
}
