import React, { useState, useRef, useEffect } from "react";


export default function Graphs(){

    const [data] = useState([25, 50, 35, 15, 94, 10]);
    const svgRef = useRef();

    return (
        <div className="graph-wrapper">
            <svg ref={svgRef}/>
        </div>
    );
}