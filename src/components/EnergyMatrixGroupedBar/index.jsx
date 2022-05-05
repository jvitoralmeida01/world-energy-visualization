import React from "react";
import { Bar } from 'react-chartjs-2';

export default function EnergyMatrixGroupedBar({countryNameOne, datasetCountryOne, countryNameTwo, datasetCountryTwo}){
    let data = {
        labels: ["Biofuel", "Coal", "Gas", "Hydro", "Nuclear", "Oil", "Solar", "Wind"],
        datasets: [
          {
          label: countryNameOne,
          data: datasetCountryOne,
          backgroundColor: ['blue'],
          },
          {
            label: countryNameTwo,
            data: datasetCountryTwo,
            backgroundColor: ['red'],
            },
        ],
      };
    
      const options = {
        responsive: true,
        plugins: {
          title: {
            color: '#fff',
            display: true,
            text: `${countryNameOne} x ${countryNameTwo} Energy Matrix`,
          },
        },
      };
    
      return (
        <div>
          <Bar data={data} options={options} />
        </div>);
};