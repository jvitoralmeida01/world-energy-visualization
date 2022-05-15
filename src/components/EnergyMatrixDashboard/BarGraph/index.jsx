import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function BarGraph({dataset}) {
  let data = {
    labels: ["Biofuel", "Coal", "Gas", "Hydro", "Nuclear", "Oil", "Solar", "Wind"],
    datasets: [{
      label: "Array de Dados",
      data: dataset,
      backgroundColor: ['#b3de69', '#fb8072', '#fdb462', '#80b1d3', '#bc80bd', '#444444', '#ffffb3', '#fccde5',]
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales:{
      y:{
        ticks:{
          color: "#ddd",
        },
        grid:{
          color: "#555"
        },
        title:{
          color: '#ddd',
          display: true,
          text: 'Percentage of Total',
        }
      },
      x:{
        ticks: {
          color: '#ddd',
        },
        grid:{
          color: "#555"
        },
        title:{
          color: '#ddd',
          display: true,
          text: 'Energy Source',
        }
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>);
}