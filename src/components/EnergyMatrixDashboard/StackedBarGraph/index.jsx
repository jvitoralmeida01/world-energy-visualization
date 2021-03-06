import React from "react";
import { Bar } from 'react-chartjs-2';

function createDatasets(dataset){

  let finalDataset = [];
  let labels = ["Biofuel", "Coal", "Gas", "Hydro", "Nuclear", "Oil", "Solar", "Wind"];
  let backgroundColor = ['#95d12e', '#fb8072', '#fdb462', '#80b1d3', '#bc80bd', '#444444', '#e5e600', '#fccde5',];

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
  return finalDataset
}

export default function StackedBarGraph({dataset, labels, countryName, isOnlyPercentage}){
  let finalDataset = createDatasets(dataset)
  let finalLabels;
  let titleCountry = "";
  let yAxisTitle = "";
  let xAxisTitle = "";
  let xAxisSymbol = "";
  let hoverSymbol = "";

  if (isOnlyPercentage){
    xAxisTitle = "Percentage of Total";
    xAxisSymbol = "%";
    hoverSymbol = "%";
  }else{
    xAxisTitle = "Production (TWh)";
    xAxisSymbol = "";
    hoverSymbol = " TWh";
  }

  if (countryName == undefined){
    finalLabels = labels;
    yAxisTitle = "Country";
  }else{
    let initValue = labels[0];
    let endValue = labels[1];
    let yearRange = endValue - initValue;
    finalLabels = [...Array(yearRange+1).keys()].map(i => i + initValue);
    titleCountry = countryName + " ";
    yAxisTitle = "Year";
  }

  let data = {
    labels: finalLabels,
    datasets: finalDataset
  };
  
  const options = {
    maintainAspectRatio: false,
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        align: 'start',
        labels:{
          color: '#fff',
          usePointStyle: true,
        }
      },
      tooltip:{
        xAlign: 'left',
        yAlign: 'center',
        displayColors: false,
        backgroundColor: ((context)=> {
          if (context.tooltipItems.length === 0){
            return "000"
          }
          return context.tooltipItems[0].element.options.backgroundColor;
        }), 
        borderColor: "#d9d9d9",
        borderWidth: "1",
        bodyColor: "white",
        callbacks:{
          label: ((tooltipItems)=> {
            let label = tooltipItems.dataset.label;
            let value = tooltipItems.formattedValue
            return label + ": " + value + hoverSymbol;
          }),
          title: ((tooltipItems)=>{return titleCountry + tooltipItems[0].label})
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
        }
      },
      x:{
        ticks: {
          stepSize: 25,
          color: '#ddd',
          callback: ((context) => {
            let newTickText = context + xAxisSymbol;
            return newTickText;
          })
        },
        grid:{
          color: "#555"
        },
        title:{
          color: '#ddd',
          display: true,
          text: xAxisTitle,
        }
      },
    },
  };
  
  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>);
}