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
      title: {
        display: true,
        color: '#fff',
        text: 'Country Energy Matrix',
        padding: {
          top: 15,
          bottom: 5,
        },
        font:{
          size: '14',
        },
      },
    },
    scales:{
      y:{
        ticks:{
          color: "#ddd",
        },
        grid:{
          color: "#555"
        }
      },
      x:{
        ticks: {
          color: '#ddd',
        },
        grid:{
          color: "#555"
        }
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>);
}