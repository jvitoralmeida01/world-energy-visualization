import React, {useRef, useEffect, useState} from "react";
import {select, geoPath, geoMercator} from 'd3';
import gsap from 'gsap';
import useResizeObserver from "../../hooks/useResizeObserver";
import MapToast from "./mapToast";

export default function WorldMap({ data, setParentCountries }){

    const wrapperRef = useRef();
    const svgRef = useRef();
    const alertRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [selectedCountryA, setSelectedCountryA] = useState(null);
    const [selectedCountryB, setSelectedCountryB] = useState(null);
    const [isAlerting, setIsAlerting] = useState(false);
    const [hoveredCountry, setHoveredCountry] = useState(null);

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
                  return "white";
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