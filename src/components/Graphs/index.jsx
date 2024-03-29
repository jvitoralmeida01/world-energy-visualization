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

async function createData(country, yearRange, labels){

  let rawDataset = await DataGrabber.fetchDataset("https://raw.githubusercontent.com/owid/energy-data/master/owid-energy-data.csv");
  let filteredDataset = datasetFilter.filterByCountry(rawDataset, country);
  filteredDataset = datasetFilter.filterByYear(filteredDataset, yearRange);
  filteredDataset = datasetFilter.filterByLabels(filteredDataset, labels);

  return filteredDataset;
}

export default function Graphs({countryOne, countryTwo, yearRange, isOnlyPercentage}){

  //Page State Variables
  const [isDoubleCountry, setIsDoubleCountry] = useState(false) //One or Two
  const [isYearSearch, setIsYearSearch] = useState(true); //Year or History

  //Dataset Variables
  const [dataOneTotal, setDataOneTotal] = useState([]);
  const [dataOnePercentage, setDataOnePercentage] = useState([]);
  const [dataTwoTotal, setDataTwoTotal] = useState([]);
  const [dataTwoPercentage, setDataTwoPercentage] = useState([]);
  
  useEffect(() => {
    if (yearRange[1] - yearRange[0] > 0){
      setIsYearSearch(false);
    }else{
      setIsYearSearch(true);
    }
    countryOne = ''
    countryTwo = ''
  }, [yearRange])

  useEffect(() => {
    if (countryOne != ""){
      //Creating data for dataOnePercentage
      let labels = ["biofuel_share_elec", "coal_share_elec", "gas_share_elec", "hydro_share_elec", "nuclear_share_elec",
      "oil_share_elec", "solar_share_elec", "wind_share_elec"];
      createData(countryOne, yearRange, labels).then(data => setDataOnePercentage(data));

      //Creating data for dataOneTotal
      labels = ["biofuel_electricity", "coal_electricity", "gas_electricity", "hydro_electricity", "nuclear_electricity",
      "oil_electricity", "solar_electricity", "wind_electricity"];
      createData(countryOne, yearRange, labels).then(data => setDataOneTotal(data));
    }else{
      setDataOneTotal([]);
      setDataOnePercentage([]);
    }
  }, [countryOne, yearRange]);

  useEffect(() => {
    if(countryTwo != ""){
      //Creating data for dataTwoPercentage
      let labels = ["biofuel_share_elec", "coal_share_elec", "gas_share_elec", "hydro_share_elec", "nuclear_share_elec",
      "oil_share_elec", "solar_share_elec", "wind_share_elec"];
      createData(countryTwo, yearRange, labels).then(data => setDataTwoPercentage(data));

      //Creating data for dataTwoTotal
      labels = ["biofuel_electricity", "coal_electricity", "gas_electricity", "hydro_electricity", "nuclear_electricity",
      "oil_electricity", "solar_electricity", "wind_electricity"];
      createData(countryTwo, yearRange, labels).then(data => setDataTwoTotal(data));

      //set two countries existence
      setIsDoubleCountry(true);
    }else{
      setDataTwoTotal([]);
      setDataTwoPercentage([]);
      setIsDoubleCountry(false);
    }
  }, [countryTwo, yearRange]);


    if(countryOne.length == '' && countryTwo.length == ''){
      return(
        <div className="graph-wrapper">
          <h1 className="indicator-emoji" style={{height: '200px', width: '200px'}}>👈</h1>
          <h3> 🗾 Select one <span className="tutorial">(left click)</span> or more <span className="tutorial">(right click)</span> countries to visualize and compare it's data;</h3>
          <h4 className="tutorial"> 🔍 If you can´t find a given Country on the map, feel free to select it with the input on the top;</h4>
          <h4 className="tutorial"> 📆 Change the sliders on the top to alter the year range of the data;</h4>
          <h4 className="tutorial"> 🎯 Click the button on the top-right to toggle between absolute values or percentage values;</h4>
          <h4 className="tutorial"> ⌨️ You can also click 'Esc' to cancel your selection.</h4>
        </div>
      )
    }

    return (
      <div className="graph-wrapper">
        {isYearSearch && !isDoubleCountry //Year, One
        ? <div>
            <h3 className="title-one">{countryOne} Energy Generation Matrix ({isOnlyPercentage? "in %" : "in TWh"})</h3>            
            <BarGraph dataset ={isOnlyPercentage? dataOnePercentage : dataOneTotal} isOnlyPercentage ={isOnlyPercentage}/>  

            <h3 className="title-pie">{countryOne} Energy Generation by Energy Source</h3>
              <PieGraph dataset ={dataOnePercentage} />
         </div>
        :isYearSearch && isDoubleCountry //Year, Two
        ? <div>
            <h3 className="title-one">{countryOne} x {countryTwo} Energy Generation Matrix ({isOnlyPercentage? "in %" : "in TWh"})</h3>            
            <GroupedBarGraph countryNameOne = {countryOne} datasetCountryOne={isOnlyPercentage? dataOnePercentage : dataOneTotal} countryNameTwo = {countryTwo} datasetCountryTwo={isOnlyPercentage? dataTwoPercentage : dataTwoTotal} isOnlyPercentage ={isOnlyPercentage}/>

            <h3 className="title-two">{countryOne} x {countryTwo} Energy Generation Matrix</h3>
            <StackedBarGraph dataset={dataOrganizer.arrayForEachLabel(dataOnePercentage.concat(dataTwoPercentage), 8)} labels={[countryOne, countryTwo]} isOnlyPercentage={true}/> {/*Country Comparation*/}
         </div>
         :!isYearSearch && !isDoubleCountry //History, One
         ? <div>
             <h3 className="title-one">{countryOne} Energy Generation Matrix from {yearRange[0]} to {yearRange[1]} ({isOnlyPercentage? "in %" : "in TWh"})</h3>
             <StackedBarGraph dataset={dataOrganizer.arrayForEachLabel(isOnlyPercentage? dataOnePercentage : dataOneTotal, 8)} labels={yearRange} countryName={countryOne} isOnlyPercentage ={isOnlyPercentage}/> {/*Historical*/}
          </div>
        :<div> {/*History, Two*/}
            <h3 className="title-one">{countryOne} Energy Generation Matrix from {yearRange[0]} to {yearRange[1]} ({isOnlyPercentage? "in %" : "in TWh"})</h3>
            <StackedBarGraph dataset={dataOrganizer.arrayForEachLabel(isOnlyPercentage? dataOnePercentage : dataOneTotal, 8)} labels={yearRange} countryName={countryOne} isOnlyPercentage ={isOnlyPercentage}/> {/*Historical*/}
            <h3 className="title-two">{countryTwo} Energy Generation Matrix from {yearRange[0]} to {yearRange[1]} ({isOnlyPercentage? "in %" : "in TWh"})</h3>
            <StackedBarGraph dataset={dataOrganizer.arrayForEachLabel(isOnlyPercentage? dataTwoPercentage : dataTwoTotal, 8)} labels={yearRange} countryName={countryTwo} isOnlyPercentage ={isOnlyPercentage}/> {/*Historical*/}
         </div>
        }
      </div>
    );
}