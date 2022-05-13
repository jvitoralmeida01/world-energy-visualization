import React, {useRef, useEffect, useState} from "react";
import {select, geoPath, geoMercator} from 'd3';
import gsap from 'gsap';
import useResizeObserver from "../../hooks/useResizeObserver";
import MapToast from "./mapToast";
import DataGrabber from "../../utils/dataGrabber.mjs";
import datasetFilter from "../../utils/datasetFilter.mjs";

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

export default function WorldMap({ data, setParentCountries }){

    const colors = ['Green', 'Red', 'Orange', 'Cyan', 'Purple', 'Black', 'Yellow', 'Pink'];
    const wrapperRef = useRef();
    const svgRef = useRef();
    const alertRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [selectedCountryA, setSelectedCountryA] = useState(null);
    const [selectedCountryB, setSelectedCountryB] = useState(null);
    const [isAlerting, setIsAlerting] = useState(false);
    const [hoveredCountry, setHoveredCountry] = useState(null);
    const [dataset, setDataset] = useState([]);

    useEffect(() => {
      createData().then(data => setDataset(data));
    }, []);

    useEffect(() => {
        const {width, height} = dimensions || wrapperRef.current.getBoundingClientRect();
        const svg = select(svgRef.current);
        svg.attr("width", width).attr("height", height).style("stroke", "black").style("stroke-width", width/2000);

        const projection = geoMercator().fitSize([width, height], data).precision(100);
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
              setSelectedCountryA(selectedCountryA === feature ? null : feature);
            }else{
              setIsAlerting(true);
              setTimeout(() => {setIsAlerting(false)}, 500);
            }
            
          })
          .on("contextmenu", (d, feature) => {
            if(selectedCountryA !== feature){
              setSelectedCountryB(selectedCountryB === feature ? null : feature);
            }else{
              setIsAlerting(true);
              setTimeout(() => {setIsAlerting(false)}, 500);
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
              if(selectedCountryA === feature) {
                return "gold";
              }else if(selectedCountryB === feature) {
                return "lime";
              } else if(hoveredCountry === feature) {
                return "cyan";
              }else{
                if(selectedCountryA === null && selectedCountryB === null){
                  return getGreaterColor(dataset, feature.properties.name, [2000,2000], colors) || "grey";
                }else{
                  return "grey";
                }
              }
          })
          .attr('d', feature => pathFactory(feature));

    }, [data, selectedCountryA, selectedCountryB, dimensions, hoveredCountry]);

    useEffect(() => {
      setParentCountries([selectedCountryA, selectedCountryB]);
    }, [selectedCountryA, selectedCountryB]);

    return(
        <div ref={wrapperRef} className="map-wrapper">
          <MapToast alert={isAlerting}></MapToast>
          <svg ref={svgRef}></svg>
        </div>
    );
}