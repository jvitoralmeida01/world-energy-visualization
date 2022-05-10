import React from "react";
import { Bar } from 'react-chartjs-2';

function createDatasets(dataset){
  let finalDataset = [];
  let labels = ["Biofuel", "Coal", "Gas", "Hydro", "Nuclear", "Oil", "Solar", "Wind"];
  let backgroundColor = ['Green', 'Red', 'Orange', 'Cyan', 'Purple', 'Black', 'Yellow', 'Pink'];

  for (let i = 0; i < 8; i++){
    finalDataset.push(
      {
      label: labels[i],
      data: dataset[i],
      backgroundColor: backgroundColor[i],
      stack: 'Stack 0',
      }
    );
  }
  console.log (finalDataset);
  return finalDataset
}

export default function StackedBarGraph({dataset, labels, countryName}){
  let finalDataset = createDatasets(dataset)

  let data = {
    labels: labels,
    datasets: finalDataset
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
        },
      },
    },
    scales:{
      y:{
        ticks:{
          color: "#ddd",
        },
        stacked: true,
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