//Custom Components
import Title from './components/Title'
import WorldMap from './components/WorldMap'
import Graphs from './components/Graphs'

import mapData from "./worldMap.geo.json";
import { useState, useEffect } from 'react'

function App() {

  const [countries, setCountries] = useState([,]);

  useEffect(() => {
    console.log(countries);
  }, [countries]);
  

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
          <Graphs countryOne={
            countries[0] != undefined ? countries[0].properties.name : ""
          } countryTwo={
            countries[1] != undefined ? countries[1].properties.name : ""
          } yearRange={
            [2000, 2000]
          } />
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