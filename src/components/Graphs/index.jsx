import React, {useEffect, useState, useRef}  from "react";
import EnergyMatrixBar from "../EnergyMatrixBar";
import EnergyMatrixPie from "../EnergyMatrixPie";
import EnergyMatrixGroupedBar from "../EnergyMatrixGroupedBar";
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
  const [qtdCountry, setQtdCountry] = useState("One") //One or Two
  const [typeSearch, setTypeSearch] = useState("Year"); //Year or History
  const [data, setData] = useState([]);
  
  useEffect(() => {
    createData(country).then(data => setData(data));
  }, [country]);

  return (
    <div className="graph-wrapper">
      <button onClick={function () {
        if (typeSearch == "Year")
          setTypeSearch("History")
        else
          setTypeSearch("Year")
        }}>Change Qtd Country</button>
        
      <button onClick={function () {
        if (qtdCountry == "One")
          setQtdCountry("Two")
        else
          setQtdCountry("One")
        }
      }>Change Type Search</button> 

      {typeSearch == "Year" && qtdCountry == "One"
      ? <div>
          <EnergyMatrixBar dataset ={data} />  
          <EnergyMatrixPie dataset ={data} />
       </div>
      :typeSearch == "Year" && qtdCountry == "Two"
      ? <div>
          <EnergyMatrixGroupedBar countryNameOne = {country} datasetCountryOne={data} countryNameTwo = {country} datasetCountryTwo={data}/>
          <p>StackedBarChart (two countries)</p>
       </div>
       :typeSearch == "History" && qtdCountry == "One"
       ? <div>
           <p>StackedHistoricalBarChart (one countrie)</p>
        </div>
      :<div>
          <p>StackedHistoricalBarChart (one countrie)</p>
          <p>StackedHistoricalBarChart (one countrie)</p>
       </div>
      }
    </div>
  );
}