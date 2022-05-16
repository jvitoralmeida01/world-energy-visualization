import React, {useRef, useEffect, useState} from "react";
import {select, geoPath, geoMercator} from 'd3';
import gsap from 'gsap';
import useResizeObserver from "../../hooks/useResizeObserver";
import MapToast from "./mapToast";
import DataGrabber from "../../utils/dataGrabber.mjs";
import datasetFilter from "../../utils/datasetFilter.mjs";

import toast from  'react-hot-toast'

const toastStyleError = {
  border: '2px solid #ff5555',
  borderRadius: '10px',
  background: '#522',
  color: '#fff',
}

const toastStyleWarn = {
  border: '2px solid #ffff55',
  borderRadius: '10px',
  background: '#552',
  color: '#fff',
}

async function createData(){
  let rawDataset = await DataGrabber.fetchDataset("https://raw.githubusercontent.com/owid/energy-data/master/owid-energy-data.csv");
  return rawDataset;
}

function getGreaterColor(dataset, country, yearRange, colors){
  let labels = ["biofuel_share_elec", "coal_share_elec", "gas_share_elec", "hydro_share_elec", "nuclear_share_elec",
    "oil_share_elec", "solar_share_elec", "wind_share_elec"];

  let filteredDataset = datasetFilter.filterByCountry(dataset, country);
  filteredDataset = datasetFilter.filterByYear(filteredDataset, yearRange);
  filteredDataset = datasetFilter.filterByLabels(filteredDataset, labels);

  //get higher value
  let greaterValue = Math.max(...filteredDataset);
  
  //solving bug with rounded number
  if (greaterValue == Math.round(greaterValue)){
    greaterValue = greaterValue + ".0"
  }else{
    greaterValue = "" +greaterValue;
  }
  //get index of higher value
  let indexGreaterValue = filteredDataset.indexOf(greaterValue);
  
  return colors[indexGreaterValue];
}

function countryHasData(dataset, country, yearRange) {
  
  let labels = ["biofuel_share_elec", "coal_share_elec", "gas_share_elec", "hydro_share_elec", "nuclear_share_elec",
    "oil_share_elec", "solar_share_elec", "wind_share_elec"];

  let filteredDataset = datasetFilter.filterByCountry(dataset, country);
  filteredDataset = datasetFilter.filterByYear(filteredDataset, yearRange);
  filteredDataset = datasetFilter.filterByLabels(filteredDataset, labels);
  
  return filteredDataset.length > 0;
  
}

export default function WorldMap({ parentCountryOne, parentCountryTwo, yearRange, data, setParentCountryOne, setParentCountryTwo }){

    const wrapperRef = useRef();
    const svgRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [selectedCountryA, setSelectedCountryA] = useState(null);
    const [selectedCountryB, setSelectedCountryB] = useState(null);
    const [renderTrigger, setRenderTrigger] = useState(false);
    const [hoveredCountry, setHoveredCountry] = useState(null);
    const [dataset, setDataset] = useState([]);

    useEffect(() => {
      createData().then(data => setDataset(data));
    }, []);

    useEffect(() => {
      const {width, height} = dimensions || wrapperRef.current.getBoundingClientRect();
      const svg = select(svgRef.current);
      svg.attr("width", width).attr("height", height).style("stroke", "black").style("stroke-width", width/2000);
    } , [dimensions]);

    useEffect(() => {

        const colors = ['#b3de69', '#fb8072', '#fdb462', '#80b1d3', '#bc80bd', '#444444', '#ffffb3', '#fccde5',];
        const svg = select(svgRef.current);

        const projection = geoMercator().fitSize([dimensions.width, dimensions.height], data).precision(100);
        const pathFactory = geoPath().projection(projection);

        document.addEventListener("keyup", (event) => {
          if(event.code === "Escape"){
            setSelectedCountryA(null);
            setSelectedCountryB(null);
          }
        });

        document.addEventListener("contextmenu", (event) => {
          event.preventDefault();
        })

        svg
          .selectAll('.country')
          .data(data.features)
          .join('path')
          .on("click", (d, feature) => {	
            if(selectedCountryB !== feature){
              if(countryHasData(dataset, feature.properties.name, yearRange)){
                setSelectedCountryA(selectedCountryA === feature ? null : feature);
              }else{
                toast.error("Oops! Sorry :(\nWe've got no " + yearRange[0] + " data for " + feature.properties.name, {style: toastStyleError});
              }
            }else{
              toast("Wait... 🤔\nYou can't compare  " + feature.properties.name + " to itself!", {icon: '⚠️', style: toastStyleWarn});
            }
            
          })
          .on("contextmenu", (d, feature) => {
            if(selectedCountryA !== feature){
              if(countryHasData(dataset, feature.properties.name, yearRange)){
                setSelectedCountryB(selectedCountryB === feature ? null : feature);
              }else{
                toast.error("Oops! Sorry :(\nWe've got no " + yearRange[0] + " data for " + feature.properties.name, {style: toastStyleError});
              }
            }else{
              toast("Wait... 🤔\nYou can't compare " + feature.properties.name + " to itself!", {icon: '⚠️', style: toastStyleWarn});
            }
            
          })
          .on("mouseover", (d, feature) => {
            setHoveredCountry(feature);
          })
          .on("mouseout", () => {
            setHoveredCountry(null);
          })
          .attr('class', 'country')
          .transition()
          .attr("fill", feature => {
              if(parentCountryOne === feature.properties.name){
                setSelectedCountryA(feature)
              }
              if(parentCountryTwo === feature.properties.name){
                setSelectedCountryB(feature)
              }


              if(selectedCountryA === feature) {
                return "#8dd3c7";
              }else if(selectedCountryB === feature) {
                return "#bebada";
              } else if(hoveredCountry === feature && countryHasData(dataset, feature.properties.name, [yearRange[1], yearRange[1]])) {
                return "white";
              }else{
                if(selectedCountryA === null && selectedCountryB === null){
                  return getGreaterColor(dataset, feature.properties.name, [yearRange[1], yearRange[1]], colors) || "#0000";
                }else{
                  if(countryHasData(dataset, feature.properties.name, [yearRange[1], yearRange[1]])){
                    return "#aaa"  
                  }else{
                    return "#0000";
                  }
                }
              }
          })
          .attr('d', feature => pathFactory(feature));

          console.warn(parentCountryOne, parentCountryTwo);

    }, [data, parentCountryOne, parentCountryTwo, hoveredCountry, yearRange, dataset, renderTrigger]);

    useEffect(() => {
      let valueOne = selectedCountryA != null ? selectedCountryA.properties.name : "";
      setParentCountryOne(valueOne);
      setRenderTrigger(!renderTrigger);
    }, [selectedCountryA, setParentCountryOne]);

    useEffect(() => {
      let valueTwo = selectedCountryB != null ? selectedCountryB.properties.name : "";
      setParentCountryTwo(valueTwo);
      setRenderTrigger(!renderTrigger);
    }, [selectedCountryB, setParentCountryTwo])

    return(
        <div ref={wrapperRef} className="map-wrapper">
          <svg ref={svgRef}></svg>
        </div>
    );
}