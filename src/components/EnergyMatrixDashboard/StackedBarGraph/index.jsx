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
  let finalLabels;

  if (countryName == undefined){
    finalLabels = labels;
  }else{
    let initValue = labels[0];
    let endValue = labels[1];
    let yearRange = endValue - initValue;
    finalLabels = [...Array(yearRange+1).keys()].map(i => i + initValue);
  }

  let data = {
    labels: finalLabels,
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