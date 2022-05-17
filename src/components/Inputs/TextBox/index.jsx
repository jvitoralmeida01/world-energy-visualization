import React from "react";
import Select from 'react-select'
import DataGrabber from "../../../utils/dataGrabber.mjs";
import datasetFilter from "../../../utils/datasetFilter.mjs";
import { useState, useEffect } from 'react'

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

async function createData(yearRange){
  let labels = ["country"];

  let rawDataset = await DataGrabber.fetchDataset("https://raw.githubusercontent.com/owid/energy-data/master/owid-energy-data.csv");
  let filteredDataset = datasetFilter.filterByYear(rawDataset, yearRange);
  filteredDataset = datasetFilter.filterByValidValues(filteredDataset);
  filteredDataset = datasetFilter.filterByLabels(filteredDataset, labels);
  let uniqueCountries = filteredDataset.filter(onlyUnique);

  console.log (uniqueCountries)
  return uniqueCountries;
}


export default function TextBox({parentCountryOne, parentCountryTwo, yearRange, setParentCountryOne, setParentCountryTwo}){
  const [allCountriesArray, setallCountriesArray] = useState([]);
  const [countryOne, setCountryOne] = useState(null);
  const [countryTwo, setCountryTwo] = useState(null);

  useEffect(() => {
    createData([yearRange[1],yearRange[1]]).then(data => setallCountriesArray(data));
  }, [yearRange]);

  useEffect(() => {
      if (parentCountryOne === ""){
        setCountryOne(null);
      }else{
        setCountryOne({value: parentCountryOne, label: parentCountryOne})
      }

      if (parentCountryTwo === ""){
        setCountryTwo(null);
      }else{
        setCountryTwo({value: parentCountryTwo, label: parentCountryTwo})
      }
  }, [parentCountryOne, parentCountryTwo]);

  const options = allCountriesArray.map(function (x) {return {value: x, label:x}});

  return (
    <div>
      <Select className="selection" options={options} value={countryOne} onChange={(x) => setParentCountryOne(x != null ? x.value : "")}/>
      <Select className="selection" options={options} value={countryTwo} onChange={(x) => setParentCountryTwo(x != null ? x.value : "")}/>
    </div>
  );
}