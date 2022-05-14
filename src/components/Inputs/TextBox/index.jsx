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
  filteredDataset = datasetFilter.filterByLabels(filteredDataset, labels);
  let uniqueCountries = filteredDataset.filter(onlyUnique);

  return uniqueCountries;
}


export default function TextBox({yearRange, setParentCountries}){
    const [allCountriesArray, setallCountriesArray] = useState([]);
    const [countryOne, setCountryOne] = useState({value: 'American Samoa', label: 'American Samoa'});
    const [countryTwo, setCountryTwo] = useState("");

    useEffect(() => {
        let valueOne = countryOne != null ? countryOne : "";
        let valueTwo = countryTwo != null ? countryTwo : "";
        setParentCountries([valueOne, valueTwo]);
      }, [countryOne, countryTwo]);

    useEffect(() => {
        createData(yearRange).then(data => setallCountriesArray(data));
    }, []);
  
    const options = allCountriesArray.map(function (x) {return {value: x, label:x}});

    return (
        <div>
            <Select options={options} onChange={(x) => setCountryOne(x.value)}/>
            <Select options={options} onChange={(x) => setCountryTwo(x.value)}/>
        </div>
    );
}