//Custom Components
import Title from './components/Title'
import WorldMap from './components/WorldMap'
import Graphs from './components/Graphs'

import mapData from "./worldMap.geo.json";
import { useState } from 'react'

function App() {

  const setCountries = () => {
    console.log("coming from Parent!");
  }

  return (
    <div>

      <section className="container">

        <div className="item-map">
          <WorldMap data={mapData} setParentCountries={setCountries}/>
        </div>

        <div className="item-title">
          <Title text={"World Energy Visualization"}/>
        </div>

        <div className="item-graphs">
          <Graphs />
        </div>

      </section>
    </div>
  );
}

export default App;


      // <section className="container">

      //   <div className="item-title">
      //     <Title text="World Energy Visualization"/>
      //   </div>

      //   <div className="item-graphs">
      //     <Graphs />
      //   </div>

      // </section>