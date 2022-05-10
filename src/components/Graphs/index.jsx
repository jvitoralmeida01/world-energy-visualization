import React, {useEffect, useState, useRef}  from "react";
import BarGraph from "../EnergyMatrixDashboard/BarGraph";
import PieGraph from "../EnergyMatrixDashboard/PieGraph";
import GroupedBarGraph from "../EnergyMatrixDashboard/GroupedBarGraph";
import StackedBarGraph from "../EnergyMatrixDashboard/StackedBarGraph";
import DataGrabber from "../../utils/dataGrabber.mjs";
import datasetFilter from "../../utils/datasetFilter.mjs";
import dataOrganizer from "../../utils/dataOrganizer.mjs";

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

async function createData(country, yearRange){
  let labels = ["biofuel_share_elec", "coal_share_elec", "gas_share_elec", "hydro_share_elec", "nuclear_share_elec",
    "oil_share_elec", "solar_share_elec", "wind_share_elec"];

  let rawDataset = await DataGrabber.fetchDataset("https://raw.githubusercontent.com/owid/energy-data/master/owid-energy-data.csv");
  let filteredDataset = datasetFilter.filterByCountry(rawDataset, country);
  filteredDataset = datasetFilter.filterByYear(filteredDataset, yearRange);
  filteredDataset = datasetFilter.filterByLabels(filteredDataset, labels);

  return filteredDataset;
}

export default function Graphs({countryOne, countryTwo, yearRange}){

  const [isDoubleCountry, setIsDoubleCountry] = useState(false) //One or Two
  const [typeSearch, setTypeSearch] = useState("Year"); //Year or History
  const [dataOne, setDataOne] = useState([]);
  const [dataTwo, setDataTwo] = useState([]);
  
  useEffect(() => {
    if (countryOne != ""){
      createData(countryOne, yearRange).then(data => setDataOne(data));
    }
  }, [countryOne]);

  console.log(countryTwo);
  useEffect(() => {
    if(countryTwo != ""){
      createData(countryTwo, yearRange).then(data => setDataTwo(data));
      setIsDoubleCountry(true);
    }else{
      setIsDoubleCountry(false);
    }
  }, [countryTwo]);

  return (
    <div className="graph-wrapper">

      {typeSearch == "Year" && !isDoubleCountry //Year, One
      ? <div>
          <BarGraph dataset ={dataOne} />  
          <PieGraph dataset ={dataOne} />
       </div>
      :typeSearch == "Year" && isDoubleCountry //Year, Two
      ? <div>
          <GroupedBarGraph countryNameOne = {countryOne} datasetCountryOne={dataOne} countryNameTwo = {countryTwo} datasetCountryTwo={dataTwo}/>
          <StackedBarGraph dataset={dataOrganizer.arrayForEachLabel(dataOne.concat(dataTwo), 8)} labels={[countryOne, countryTwo]}/> {/*Country Comparation*/}
       </div>
       :typeSearch == "History" && !isDoubleCountry //History, One
       ? <div>
           <StackedBarGraph dataset={dataOrganizer.arrayForEachLabel(dataOne, 8)} labels={yearRange} countryName={countryOne}/> {/*Historical*/}
        </div>
      :<div> {/*History, Two*/}
          <StackedBarGraph dataset={dataOrganizer.arrayForEachLabel(dataOne, 8)} labels={yearRange} countryName={countryOne}/> {/*Historical*/}
          <StackedBarGraph dataset={dataOrganizer.arrayForEachLabel(dataTwo, 8)} labels={yearRange} countryName={countryTwo}/> {/*Historical*/}
       </div>
      }
    </div>
  );
}