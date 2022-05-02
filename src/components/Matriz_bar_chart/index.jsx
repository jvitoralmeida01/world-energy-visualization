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

function filterByCountryAndYear(d){
  return (d.country == "Brazil") && d.year >= 2000;
}

async function fetchDataset(){
  let data1 = await d3.csv("https://raw.githubusercontent.com/owid/energy-data/master/owid-energy-data.csv");
  let labels = ["biofuel_share_elec", "coal_share_elec", "gas_share_elec", "hydro_share_elec", "oil_share_elec",
    "solar_share_elec", "wind_share_elec", "nuclear_share_elec"];
  let dataset = []

  for (let i = 0; i < labels.length; i++){
    let column = labels[i];
    let data2 = data1.filter(filterByCountryAndYear)
    let newDataset = 
    {
      label: column,
      data: data2.map(x => x[column]),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
    dataset.push(newDataset)
  }
  return dataset;
}

async function createData(){
  let labels = ["biofuel_share_elec", "coal_share_elec", "gas_share_elec", "hydro_share_elec", "oil_share_elec",
    "solar_share_elec", "wind_share_elec", "nuclear_share_elec"];
  let datasets = await fetchDataset();

  return {
    labels,
    datasets,
  };
}

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

export default function Matriz_bar_chart() {
  const [data, setData] = useState(
    {
      labels: ["Aguardando"], 
      datasets: [
        {data: 5}
      ]
    }
  );
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
