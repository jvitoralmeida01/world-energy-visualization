import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip,Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import dataOrganizer from "../../../../utils/dataOrganizer.mjs";

ChartJS.register(ArcElement, Tooltip, Legend);

let labels = [
    'Biofuel', 
    'Coal', 
    'Gas', 
    'Hydro', 
    'Nuclear', 
    'Oil', 
    'Solar', 
    'Wind'];

let colors = [ 
    '#95d12e',
    '#fb8072',
    '#fdb462',
    '#80b1d3',
    '#bc80bd',
    '#444444',
    '#e5e600',
    '#fccde5',
];

/*['#8dd3c7','#','#bebada','#','#','#','#','#','#d9d9d9','#'] */

export default function PieChart({dataset}) {
    
    let finalUnifiedData = [[],[],[]];
    if (dataset.length > 0){
        let sortedUnifiedData = dataOrganizer.putThreeInDescendingOrder(dataset, labels, colors);
        finalUnifiedData = dataOrganizer.putIntoFiveSets(sortedUnifiedData[0], sortedUnifiedData[1], sortedUnifiedData[2]);
    }

    let finalDataset = finalUnifiedData[0];
    let finalLabels = finalUnifiedData[1];
    let finalColors = finalUnifiedData[2];

    let data = {
        labels: finalLabels,
        datasets: [
            {
            label: 'Percentage of Production',
            data: finalDataset,
            backgroundColor: finalColors,
            borderColor: '#d9d9d9',
            borderWidth: 1,
            },
        ],
    };

    const options = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend:{
        position: 'right',
          title:{
            color: '#fff',
            display: true,
            font: {weight: '600'},
            text: 'Energy source:',
          },
          labels:{color: '#fff'}
        },
        tooltip:{
          xAlign: 'center',
          displayColors: false,
          bodyAlign: 'center',
          backgroundColor: ((context)=> {
            if (context.tooltipItems.length === 0){
              return "#000"
            }
            return context.tooltipItems[0].element.options.backgroundColor;
          }), 
          borderColor: "#d9d9d9",
          borderWidth: "1",
          callbacks:{
            label: ((tooltipItems)=> {
              let label = tooltipItems.label;
              let value = tooltipItems.formattedValue
              return label + ": " + value + "%";
            }),
          }
        }
      },
    };

    return (
    <div className="chart-container">
      <Pie data={data} options={options} />
    </div>
    );
}
