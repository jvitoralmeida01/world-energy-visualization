import React, {useEffect, useState, useRef}  from "react";
import BarChart from "../../../components/Graphs/SimpleCharts/BarChart";
import PieChart from "../../../components/Graphs/SimpleCharts/PieChart";
import GroupedBarChart from "../../../components/Graphs/SimpleCharts/GroupedBarChart";
import StackedBarChart from "../../../components/Graphs/SimpleCharts/StackedBarChart";
import dataOrganizer from "../../../utils/dataOrganizer.mjs";

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

export default function GraphsManager({countryOne, dataOne, dataPie, countryTwo, dataTwo, yearRange, isOnlyPercentage}){

  //Page State Variables
  const [isDoubleCountry, setIsDoubleCountry] = useState(false) //One or Two
  const [isYearSearch, setIsYearSearch] = useState(true); //Year or History
  
  useEffect(() => {
    if (countryTwo !== ""){
      setIsDoubleCountry(true);
    }
    else {
      setIsDoubleCountry(false);
    }
  }, [countryTwo]);

  useEffect(() => {
    if (yearRange[1] - yearRange[0] > 0){
      setIsYearSearch(false);
    }else{
      setIsYearSearch(true);
    }
  }, [yearRange])


  if(countryOne == '' && countryTwo == ''){
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
  else if (isYearSearch && !isDoubleCountry){//Year, One
    return (
      <div className="graph-wrapper">
        <h3 className="title-one">{countryOne} Energy Generation Matrix ({isOnlyPercentage? "in %" : "in TWh"})</h3>            
        <BarChart dataset ={dataOne} isOnlyPercentage ={isOnlyPercentage}/>  

        <h3 className="title-pie">{countryOne} Energy Generation by Energy Source</h3>
        <PieChart dataset ={dataPie} />
      </div>
    )
  }
  else if (isYearSearch && isDoubleCountry){//Year, Two
    return(
      <div className="graph-wrapper">
        <h3 className="title-one">{countryOne} x {countryTwo} Energy Generation Matrix ({isOnlyPercentage? "in %" : "in TWh"})</h3>            
        <GroupedBarChart countryNameOne = {countryOne} datasetCountryOne={dataOne} countryNameTwo = {countryTwo} datasetCountryTwo={dataTwo} isOnlyPercentage ={isOnlyPercentage}/>

        <h3 className="title-two">{countryOne} x {countryTwo} Energy Generation Matrix</h3>
        <StackedBarChart dataset={dataOrganizer.arrayForEachLabel(dataOne.concat(dataTwo), 8)} labels={[countryOne, countryTwo]} isOnlyPercentage={true}/>
      </div>
    )
  }
  else if (!isYearSearch && !isDoubleCountry){//History, One
    return(
      <div className="graph-wrapper">
        <h3 className="title-one">{countryOne} Energy Generation Matrix from {yearRange[0]} to {yearRange[1]} ({isOnlyPercentage? "in %" : "in TWh"})</h3>
        <StackedBarChart dataset={dataOrganizer.arrayForEachLabel(dataOne, 8)} labels={yearRange} countryName={countryOne} isOnlyPercentage ={isOnlyPercentage}/>
      </div>
    )
  }
  else{/*History, Two*/
    return(
      <div className="graph-wrapper">
        <h3 className="title-one">{countryOne} Energy Generation Matrix from {yearRange[0]} to {yearRange[1]} ({isOnlyPercentage? "in %" : "in TWh"})</h3>
        <StackedBarChart dataset={dataOrganizer.arrayForEachLabel(dataOne, 8)} labels={yearRange} countryName={countryOne} isOnlyPercentage ={isOnlyPercentage}/>
        <h3 className="title-two">{countryTwo} Energy Generation Matrix from {yearRange[0]} to {yearRange[1]} ({isOnlyPercentage? "in %" : "in TWh"})</h3>
        <StackedBarChart dataset={dataOrganizer.arrayForEachLabel(dataTwo, 8)} labels={yearRange} countryName={countryTwo} isOnlyPercentage ={isOnlyPercentage}/>
      </div>
    )
  }
}