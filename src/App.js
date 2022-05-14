//Custom Components
import Title from './components/Title'
import WorldMap from './components/WorldMap'
import Graphs from './components/Graphs'
import mapData from "./worldMap.geo.json";
import TextBox from './components/Inputs/TextBox';
import SliderInput from './components/Inputs/SliderInput';
import { useState, useEffect } from 'react'

function App() {

  const [countryOne, setCountryOne] = useState("");
  const [countryTwo, setCountryTwo] = useState("");

  useEffect(() => {
    console.log(countryOne, countryTwo);
  }, [countryOne, countryTwo]);

  return (
    <div>

      <section className="container">
        <div>
          <TextBox 
            parentCountryOne = {countryOne}
            parentCountryTwo = {countryTwo}
            yearRange={[2000,2000]} 
            setParentCountryOne={setCountryOne} 
            setParentCountryTwo={setCountryTwo}
          />
        </div>
        <div className="item-map">
          <WorldMap 
            data={mapData} 
            parentCountryOne = {countryOne}
            parentCountryTwo = {countryTwo}
            setParentCountryOne={setCountryOne} 
            setParentCountryTwo={setCountryTwo}/>
        </div>

        <div className="item-title">
          <Title text={"World Energy Visualization"}/>
        </div>

        <div className="item-graphs">
          <Graphs countryOne={countryOne} countryTwo={countryTwo} yearRange={[2000, 2000]} />
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