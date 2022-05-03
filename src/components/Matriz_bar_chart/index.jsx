import React, {useState} from 'react';
import * as d3 from 'd3';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

async function fetchDataset(){
  let originalData = await d3.csv("https://raw.githubusercontent.com/owid/energy-data/master/owid-energy-data.csv");
  return originalData;
}

function filterByCountryAndYear(d){
  return (d.country == "Brazil") && (d.year == 2000);
}

function filterDataset(rawDataset){
  let labels = ["biofuel_share_elec", "coal_share_elec", "gas_share_elec", "hydro_share_elec", "nuclear_share_elec",
  "oil_share_elec", "solar_share_elec", "wind_share_elec"];
  let wantedData = [];
  let filtredData = rawDataset.filter(filterByCountryAndYear);

  for (let i = 0; i < labels.length; i++){
    let column = labels[i];
    wantedData.push(filtredData[0][column])
  }

  return wantedData;
}

async function createData(){
  let rawDataset = await fetchDataset();
  let filteredDataset = filterDataset(rawDataset);

  return {
    labels: ["Biofuel", "Coal", "Gas", "Hydro", "Nuclear", "Oil", "Solar", "Wind"],
    datasets: [{
      label: "Array de Dados",
      data: filteredDataset,
      backgroundColor: '#00008B',
    }],
  };
}

function Matriz_bar_chart() {
  const [data, setData] = useState(
    {
      labels: ["Waiting Data"], 
      datasets: []
    } 
  );
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Country Energy Matrix',
      },
    },
  };

  async function teste() {
    let data1 = await createData()
    setData(data1)
  }  
  teste();

  return (
    <div>
      <Bar options={options} data={data} />
    </div>);
}

export default Matriz_bar_chart;