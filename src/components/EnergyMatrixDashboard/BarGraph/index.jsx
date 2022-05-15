import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function BarGraph({dataset}) {
  let data = {
    labels: ["Biofuel", "Coal", "Gas", "Hydro", "Nuclear", "Oil", "Solar", "Wind"],
    datasets: [{
      label: "Array de Dados",
      data: dataset,
      backgroundColor: ['#95d12e', '#fb8072', '#fdb462', '#80b1d3', '#bc80bd', '#444444', '#e5e600', '#fccde5',]
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip:{
        xAlign: 'center',
        yAlign: 'bottom',
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
            return label + ": " + value + "%";
          }),
          title: (()=>{return ""})
        }
      },
    },
    scales:{
      y:{
        ticks:{
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