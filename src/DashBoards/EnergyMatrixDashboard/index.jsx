//React Imports
import React, {useEffect, useState, useRef}  from "react";

//SubParts Imports
import GraphsManager from "./Subparts/GraphsManager";

//Map Imports
import { Toaster } from 'react-hot-toast';
import mapData from "../../worldMap.geo.json";
import WorldMap from '../../components/Graphs/Maps/WorldMap'

//Inputs and UI Imports
import Title from '../../components/UiResources/Title'
import TextBox from '../../components/UiResources/Inputs/TextBox';
import SliderInput from '../../components/UiResources/Inputs/SliderInput';
import ButtonInput from '../../components/UiResources/Inputs/ButtonInput';

//Utils Imports
import dataGrabber from "../../utils/dataGrabber.mjs";
import datasetFilter from "../../utils/datasetFilter.mjs";

//Get dataset and return with especified labels, year and country
async function createData(country, yearRange, labels){
  let rawDataset = await dataGrabber.fetchDataset("https://raw.githubusercontent.com/owid/energy-data/master/owid-energy-data.csv");
  let filteredDataset = datasetFilter.filterByCountry(rawDataset, country);
  filteredDataset = datasetFilter.filterByYear(filteredDataset, yearRange);
  filteredDataset = datasetFilter.filterByLabels(filteredDataset, labels);

  return filteredDataset;
}

export default function EnergyMatrixDashboard (){
  
  //Input Variables
  const [countryOne, setCountryOne] = useState("");
  const [countryTwo, setCountryTwo] = useState("");
  const [yearRange, setYearRange] = useState([2021,2021]);
  const [isOnlyPercentage, setIsOnlyPercentage] = useState(false);

  //Dataset Variables
  const [dataOneTotal, setDataOneTotal] = useState([]);
  const [dataOnePercentage, setDataOnePercentage] = useState([]);
  const [dataTwoTotal, setDataTwoTotal] = useState([]);
  const [dataTwoPercentage, setDataTwoPercentage] = useState([]);

  //Update country one datasets
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

  //Update country two datasets
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

    }else{
      setDataTwoTotal([]);
      setDataTwoPercentage([]);
    }
  }, [countryTwo, yearRange]);

  return (
    <section className="container">
      <Toaster
        position="bottom-left"
        reverseOrder={false}
      />
        
      <div className="item-title">
        <Title text={"World Energy Visualization"}/>
      </div>

      <div className="item-selection">
        <TextBox 
          parentCountryOne = {countryOne}
          parentCountryTwo = {countryTwo}
          yearRange = {yearRange}
          setParentCountryOne={setCountryOne} 
          setParentCountryTwo={setCountryTwo}
        />
      </div>

      <div className="item-slider">
        <SliderInput setParentYearRange={setYearRange} />
      </div>

      <div className="item-button">
        <ButtonInput 
          setParentAbsolute={setIsOnlyPercentage} 
          parentAbsolute={isOnlyPercentage}
        />
      </div>

      <div className="item-map">
        <WorldMap 
          data={mapData} 
          parentCountryOne = {countryOne}
          parentCountryTwo = {countryTwo}
          yearRange = {yearRange}
          setParentCountryOne={setCountryOne} 
          setParentCountryTwo={setCountryTwo}
        />
      </div>

      <div className="item-graphs">
        <GraphsManager 
          countryOne={countryOne} 
          countryTwo={countryTwo}
          dataOne={isOnlyPercentage? dataOnePercentage : dataOneTotal}
          dataTwo={isOnlyPercentage? dataTwoPercentage : dataTwoTotal}
          dataPie={dataOnePercentage} 
          yearRange={yearRange} 
          isOnlyPercentage={isOnlyPercentage}
        />
      </div>

    </section>
  )
}