import React from "react";
import { Bar } from 'react-chartjs-2';

export default function GroupedBarGraph({countryNameOne, datasetCountryOne, countryNameTwo, datasetCountryTwo, isOnlyPercentage}){
  let xAxisTitle = "";
  let axisSymbol = "";
  let hoverSymbol = "";

  if (isOnlyPercentage){
    xAxisTitle = "Percentage of Total";
    axisSymbol = "%";
    hoverSymbol = "%";
  }else{
    xAxisTitle = "Production (TWh)";
    axisSymbol = "";
    hoverSymbol = " TWh";
  }

  let data = {
      labels: ["Biofuel", "Coal", "Gas", "Hydro", "Nuclear", "Oil", "Solar", "Wind"],
      datasets: [
        {
        label: countryNameOne,
        data: datasetCountryOne,
        backgroundColor: ['#8dd3c7'],
        },
        {
          label: countryNameTwo,
          data: datasetCountryTwo,
          backgroundColor: ['#bebada'],
          },
      ],
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
            text: 'Countries:',
          },
          position: 'right',
          labels:{
            color: '#fff'
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
              let label = tooltipItems.label;
              let value = tooltipItems.formattedValue
              return label + ": " + value + hoverSymbol;
            }),
            title: ((tooltipItems)=>{return tooltipItems[0].dataset.label})
          }
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
            text: 'Energy Source',
          }
        },
        x:{
          ticks: {
            stepSize: 25,
          color: '#ddd',
          callback: ((context) => {
            let newTickText = context + axisSymbol;
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
      <div>
        <Bar data={data} options={options} />
      </div>);
};