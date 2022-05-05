import React, {useEffect, useState, useRef}  from "react";
import EnergyMatrixBar from "../EnergyMatrixBar";
import EnergyMatrixPie from "../EnergyMatrixPie";
import EnergyMatrixGroupedBar from "../EnergyMatrixGroupedBar";
import EnergyMatrixStackedBar from "../EnergyMatrixStackedBar"
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
      <EnergyMatrixBar dataset ={data} />    
      <EnergyMatrixPie dataset ={data} />
      <EnergyMatrixGroupedBar countryNameOne = {country} datasetCountryOne={data} countryNameTwo = {country} datasetCountryTwo={data}/>
      <EnergyMatrixStackedBar dataset={data} labels={["2000", "2001", "2002"]}/> {/*Historical*/}
      <EnergyMatrixStackedBar dataset={data} labels={[country, country]}/> {/*Country Comparation*/}
    </div>
  );
}