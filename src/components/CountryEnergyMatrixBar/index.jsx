import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function CountryEnergyMatrixBar({dataset}) {
  let data = {
    labels: ["Biofuel", "Coal", "Gas", "Hydro", "Nuclear", "Oil", "Solar", "Wind"],
    datasets: [{
      label: "Array de Dados",
      data: dataset,
      backgroundColor: ['Green', 'Red', 'Orange', 'Cyan', 'Purple', 'Black', 'Yellow', 'Pink'],
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        color: '#fff',
        display: true,
        text: 'Country Energy Matrix',
      },
      text:{
        color: '#fff'
      }
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>);
}