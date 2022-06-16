import React, {useEffect, useState, useRef}  from "react";
import GraphsManager from "./Subparts/GraphsManager";
import dataGrabber from "../../utils/dataGrabber.mjs";
import datasetFilter from "../../utils/datasetFilter.mjs";

async function createData(country, yearRange, labels){
  let rawDataset = await dataGrabber.fetchDataset("https://raw.githubusercontent.com/owid/energy-data/master/owid-energy-data.csv");
  let filteredDataset = datasetFilter.filterByCountry(rawDataset, country);
  filteredDataset = datasetFilter.filterByYear(filteredDataset, yearRange);
  filteredDataset = datasetFilter.filterByLabels(filteredDataset, labels);

  return filteredDataset;
}

export default function EnergyMatrixDashboard ({countryOne, countryTwo, yearRange, isOnlyPercentage}){
  //Dataset Variables
  const [dataOneTotal, setDataOneTotal] = useState([]);
  const [dataOnePercentage, setDataOnePercentage] = useState([]);
  const [dataTwoTotal, setDataTwoTotal] = useState([]);
  const [dataTwoPercentage, setDataTwoPercentage] = useState([]);

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

    }else{
      setDataTwoTotal([]);
      setDataTwoPercentage([]);
    }
  }, [countryTwo, yearRange]);

  return (
    <div>
      <GraphsManager countryOne={countryOne} dataOne={isOnlyPercentage? dataOnePercentage : dataOneTotal}
              countryTwo={countryTwo} dataTwo={isOnlyPercentage? dataTwoPercentage : dataTwoTotal}
              dataPie={dataOnePercentage} yearRange={yearRange} isOnlyPercentage={isOnlyPercentage}/>
    </div>
  )
/*
Transformar EnergyMatrixDashboard no atual App
    Toaster?
    Title
    Inputs
    Mapa Mundi
    Graphs
*/
}