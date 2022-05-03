import React, {useEffect, useState, useRef}  from "react";
import CountryEnergyMatrixBar from "../CountryEnergyMatrixBar";
import DataGrabber from "../../utils/dataGrabber.mjs";
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

async function createData(country){
  let rawDataset = await DataGrabber.fetchDataset("https://raw.githubusercontent.com/owid/energy-data/master/owid-energy-data.csv");
  let filteredDataset = DataGrabber.filterDataset(rawDataset, country);

  return {
    labels: ["Biofuel", "Coal", "Gas", "Hydro", "Nuclear", "Oil", "Solar", "Wind"],
    datasets: [{
      label: "Array de Dados",
      data: filteredDataset,
      backgroundColor: 'cyan',
    }],
  };
}

export default function Graphs(){

  const [country, setCountry] = useState("Brazil");
  
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
        color: '#fff',
        display: true,
        text: 'Country Energy Matrix',
      },
    },
  };
  
  useEffect(() => {
    createData(country).then(data => setData(data));
  }, [country]);

  return (
    <div className="graph-wrapper">
      <CountryEnergyMatrixBar data={data} options={options}/>     
    </div>
  );
}