import React from "react";
import { Bar } from 'react-chartjs-2';

function createDatasets(dataset){
  let finalDataset = [];
  let labels = ["Biofuel", "Coal", "Gas", "Hydro", "Nuclear", "Oil", "Solar", "Wind"];
  let backgroundColor = ['#b3de69', '#fb8072', '#fdb462', '#80b1d3', '#bc80bd', '#444444', '#ffffb3', '#fccde5',]

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
  let yAxisTitle = "";

  if (countryName == undefined){
    finalLabels = labels;
    yAxisTitle = "Country";
  }else{
    let initValue = labels[0];
    let endValue = labels[1];
    let yearRange = endValue - initValue;
    finalLabels = [...Array(yearRange+1).keys()].map(i => i + initValue);
    yAxisTitle = "Year";
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
        title:{
          color: '#fff',
          display: true,
          font: {weight: '600'},
          text: 'Energy source:',
        },
        position: 'right',
        align: 'start',
        labels:{
          color: '#fff'
        }
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
        },
        title:{
          color: '#ddd',
          display: true,
          text: yAxisTitle,
        }
      },
      x:{
        ticks: {
          stepSize: 25,
          color: '#ddd',
          callback: ((context) => {
            let newTickText = context + "%";
            return newTickText;
          })
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
    },
  };
  
  return (
    <div>
      <Bar data={data} options={options} />
    </div>);
}