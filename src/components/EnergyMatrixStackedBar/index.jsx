import React from "react";
import { Bar } from 'react-chartjs-2';

export default function EnergyMatrixStackedBar({dataset, labels, countryName}){
  let data = {
    labels: labels,
    datasets: [
    {
      label: "Biofuel",
      data: [dataset[0]],
      backgroundColor: 'Green',
      stack: 'Stack 0'
    },
    {
      label: "Coal",
      data: [dataset[1]],
      backgroundColor: 'Red',
      stack: 'Stack 0'
    },
    {
      label: "Gas",
      data: [dataset[2]],
      backgroundColor: 'Orange',
      stack: 'Stack 0'
    },
    {
      label: "Hydro",
      data: [dataset[3]],
      backgroundColor: 'Cyan',
      stack: 'Stack 0'
    },
    {
      label: "Nuclear",
      data: [dataset[4]],
      backgroundColor: 'Purple',
      stack: 'Stack 0'
    },
    {
      label: "Oil",
      data: [dataset[5]],
      backgroundColor:'Black',
      stack: 'Stack 0'
    },
    {
      label: "Solar",
      data: [dataset[6]],
      backgroundColor:'Yellow',
      stack: 'Stack 0'
    },
    {
      label: "Wind",
      data: [dataset[7]],
      backgroundColor: 'Pink',
      stack: 'Stack 0'
    }
  ],
  };
  
  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels:{
          color: '#fff'
        }
      },
      title: {
        color: '#fff',
        display: true,
        text: `${countryName} - Energy Matrix Distribution`,
        padding: {
          top: 15,
          bottom: 5,
        },
        font:{
          size: '14',
          style: 'bold'
        },
      },
    },
    scales:{
      y:{
        ticks:{
          color: "#ddd",
        },
        stacked: true,
      },
      x:{
        ticks: {
          color: '#ddd',
        }
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>);
}