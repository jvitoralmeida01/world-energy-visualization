import React, {useRef, useEffect, useState} from "react";
import {select, geoPath, geoMercator} from 'd3';
import useResizeObserver from "../../hooks/useResizeObserver";

export default function WorldMap({ data }){

    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [hoveredCountry, setHoveredCountry] = useState(null);

    useEffect(() => {
        const {width, height} = dimensions || wrapperRef.current.getBoundingClientRect();
        const svg = select(svgRef.current);
        svg.attr("width", width).attr("height", height).style("stroke", "black").style("stroke-width", width/2000);

        const projection = geoMercator().fitSize([width, height], selectedCountry || data).precision(100);
        const pathFactory = geoPath().projection(projection);

        svg
          .selectAll('.country')
          .data(data.features)
          .join('path')
          .on("click", (d, feature) => {	
            setSelectedCountry(selectedCountry === feature ? null : feature);
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
              if(hoveredCountry === feature) {
                    return "cyan";
              }else{
                    return "white";
              }
          })
          .attr('d', feature => pathFactory(feature));

    }, [data, dimensions, selectedCountry, hoveredCountry]);

    return(
        <div ref={wrapperRef} className="map-wrapper">
            <svg ref={svgRef}></svg>
        </div>
    );
}