import React from "react";
import { Bar } from 'react-chartjs-2';

export default function GroupedBarGraph({countryNameOne, datasetCountryOne, countryNameTwo, datasetCountryTwo}){
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
            position: 'right',
            labels:{
              color: '#fff'
            }
          },
          title: {
            color: '#fff',
            display: true,
            text: `${countryNameOne} x ${countryNameTwo} Energy Matrix`,
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
};