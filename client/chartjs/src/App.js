import React, { useState, useEffect } from "react";
import "./App.css";
import LineChart from "./components/LineChart";

function App() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
        );
        const data = await response.json();
        // Extracting dates and cases data from the API response
        const dates = Object.keys(data.cases);
        const cases = Object.values(data.cases);
        // Creating the chart data object
        const chartData = {
          labels: dates,
          datasets: [
            {
              label: "Covid Cases",
              data: cases,
              backgroundColor: "rgba(12,192,192,1)",
              borderColor: "black",
              borderWidth: .75,
            },
          ],
        };
        setChartData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <div>{<h3>Graph showing the cases fluctuations</h3>}</div>
      <div style={{ width: 1400 }}>
        {chartData && <LineChart chartData={chartData} />}
      </div>
      <div>{<a href="https://coovidmap.netlify.app/"><b>For Map Click Here</b></a>}</div>
    </div>
  );
}

export default App;
