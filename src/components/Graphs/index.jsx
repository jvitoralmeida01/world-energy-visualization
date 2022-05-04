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

  return filteredDataset;
}

export default function Graphs(){

  const [country, setCountry] = useState("Brazil");
  
  const [data, setData] = useState([]);
  
  useEffect(() => {
    createData(country).then(data => setData(data));
  }, [country]);

  return (
    <div className="graph-wrapper">
      <CountryEnergyMatrixBar dataset ={data} />    
    </div>
  );
}