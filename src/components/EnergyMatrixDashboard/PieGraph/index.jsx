import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import dataOrganizer from "../../../utils/dataOrganizer.mjs";

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
    'Green',
    'Red',
    'Orange',
    'Cyan',
    'Purple',
    'Black',
    'Yellow',
    'Pink',
];

export default function PieGraph({dataset}) {
    
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
            borderColor: '#ddd',
            borderWidth: 1,
            },
        ],
    };

    const options = {
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
      },
    };

    return <Pie data={data} options={options} />;
}
