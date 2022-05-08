import React, {useEffect, useState, useRef}  from "react";
import BarGraph from "../EnergyMatrixDashboard/BarGraph";
import PieGraph from "../EnergyMatrixDashboard/PieGraph";
import GroupedBarGraph from "../EnergyMatrixDashboard/GroupedBarGraph";
import StackedBarGraph from "../EnergyMatrixDashboard/StackedBarGraph";
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
        }}>Change Type Search</button>
        
      <button onClick={function () {
        if (qtdCountry == "One")
          setQtdCountry("Two")
        else
          setQtdCountry("One")
        }
      }>Change Qtd Country</button> 

      {typeSearch == "Year" && qtdCountry == "One"
      ? <div>
          <BarGraph dataset ={data} />  
          <PieGraph dataset ={data} />
       </div>
      :typeSearch == "Year" && qtdCountry == "Two"
      ? <div>
          <GroupedBarGraph countryNameOne = {country} datasetCountryOne={data} countryNameTwo = {country} datasetCountryTwo={data}/>
          <StackedBarGraph dataset={data} labels={[country, country]} countryName={country}/> {/*Country Comparation*/}
       </div>
       :typeSearch == "History" && qtdCountry == "One"
       ? <div>
           <StackedBarGraph dataset={data} labels={["2000", "2001", "2002"]} countryName={country}/> {/*Historical*/}
        </div>
      :<div>
          <StackedBarGraph dataset={data} labels={["2000", "2001", "2002"]} countryName={country}/> {/*Historical*/}
          <StackedBarGraph dataset={data} labels={["2000", "2001", "2002"]} countryName={country}/> {/*Historical*/}
       </div>
      }
    </div>
  );
}