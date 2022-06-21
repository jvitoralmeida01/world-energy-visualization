//React Imports
import React, {useEffect, useState, useRef}  from "react";

//Chart Imports
import BarChart from "../../../components/Graphs/SimpleCharts/BarChart";
import PieChart from "../../../components/Graphs/SimpleCharts/PieChart";
import GroupedBarChart from "../../../components/Graphs/SimpleCharts/GroupedBarChart";
import StackedBarChart from "../../../components/Graphs/SimpleCharts/StackedBarChart";

//ChartJs Imports
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
  const [unit, setUnit] = useState("in %"); //% or TWH

  //Update quantity of countries
  useEffect(() => {
    if (countryTwo !== ""){
      setIsDoubleCountry(true);
    }
    else {
      setIsDoubleCountry(false);
    }
  }, [countryTwo]);

  //Update type of search
  useEffect(() => {
    if (yearRange[1] - yearRange[0] > 0){
      setIsYearSearch(false);
    }else{
      setIsYearSearch(true);
    }
  }, [yearRange])

  //Update Chart Units
  useEffect(() => {
    if (isOnlyPercentage){
      setUnit("in %");
    }else{
      setUnit("in TWh");
    }
  }, [isOnlyPercentage])

  //Visualization: One country and Year Search
  if (isYearSearch && !isDoubleCountry){
    return (
      <div className="graph-wrapper">
        <h3 className="title-one">{countryOne} Energy Generation Matrix ({unit})</h3>            
        <BarChart 
          dataset ={dataOne} 
          isOnlyPercentage ={isOnlyPercentage}
        />  

        <h3 className="title-pie">{countryOne} Energy Generation by Energy Source</h3>
        <PieChart dataset ={dataPie} />
      </div>
    )
  }
  //Visualization: Two countries and Year Search
  else if (isYearSearch && isDoubleCountry){
    return(
      <div className="graph-wrapper">
        <h3 className="title-one">{countryOne} x {countryTwo} Energy Generation Matrix ({unit})</h3>            
        <GroupedBarChart 
          countryNameOne = {countryOne} 
          datasetCountryOne={dataOne} 
          countryNameTwo = {countryTwo} 
          datasetCountryTwo={dataTwo} 
          isOnlyPercentage ={isOnlyPercentage}
        />

        <h3 className="title-two">{countryOne} x {countryTwo} Energy Generation Matrix</h3>
        <StackedBarChart 
          dataset={dataOne.concat(dataTwo)} 
          labels={[countryOne, countryTwo]} 
          isOnlyPercentage={isOnlyPercentage}
        />
      </div>
    )
  }
  //Visualization: One country and Historical Search
  else if (!isYearSearch && !isDoubleCountry){
    return(
      <div className="graph-wrapper">
        <h3 className="title-one">{countryOne} Energy Generation Matrix from {yearRange[0]} to {yearRange[1]} ({unit})</h3>
        <StackedBarChart 
          dataset={dataOne} 
          labels={yearRange} 
          countryName={countryOne} 
          isOnlyPercentage ={isOnlyPercentage}
        />
      </div>
    )
  }
  //Visualization: Two countries and Historical Search
  else{
    return(
      <div className="graph-wrapper">
        <h3 className="title-one">{countryOne} Energy Generation Matrix from {yearRange[0]} to {yearRange[1]} ({unit})</h3>
        <StackedBarChart 
          dataset={dataOne} 
          labels={yearRange} 
          countryName={countryOne} 
          isOnlyPercentage ={isOnlyPercentage}
        />

        <h3 className="title-two">{countryTwo} Energy Generation Matrix from {yearRange[0]} to {yearRange[1]} ({unit})</h3>
        <StackedBarChart 
          dataset={dataTwo}
          labels={yearRange}
          countryName={countryTwo}
          isOnlyPercentage ={isOnlyPercentage}
        />
      </div>
    )
  }
}