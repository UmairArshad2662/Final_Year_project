import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
const Graphs = () => {
    // Data for the first graph (Bar chart)
    const barChartData = {
      labels: ['Label 1', 'Label 2', 'Label 3'],
      datasets: [
        {
          label: 'Bar Chart',
          data: [10, 20, 30],
          backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(75,192,192,0.6)', 'rgba(75,192,192,0.6)'],
        },
      ],
    };
  
    // Data for the second graph (Line chart)
    const lineChartData = {
      labels: ['Label A', 'Label B', 'Label C'],
      datasets: [
        {
          label: 'Line Chart',
          data: [5, 15, 25],
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          fill: false,
        },
      ],
    };
  
    return (
      <div>
        <div>
          <h2>Bar Chart</h2>
          <Bar data={barChartData} />
        </div>
        <div>
          <h2>Line Chart</h2>
          <Line data={lineChartData} />
        </div>
      </div>
    );
  };
  
  export default Graphs;
  