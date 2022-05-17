//Imports
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

//Custom Components
import Title from './components/Title'
import WorldMap from './components/WorldMap'
import Graphs from './components/Graphs'
import mapData from "./worldMap.geo.json";
import TextBox from './components/Inputs/TextBox';
import SliderInput from './components/Inputs/SliderInput';
import ButtonInput from './components/Inputs/ButtonInput';

function App() { 

  const [countryOne, setCountryOne] = useState("");
  const [countryTwo, setCountryTwo] = useState("");
  const [yearRange, setYearRange] = useState([2021,2021]);
  const [isAbsolute, setIsAbsolute] = useState(false);

  return (
    <section className="container">

        <Toaster
        position="bottom-left"
        reverseOrder={false}
        />
      
        <div className="item-title">
          <Title text={"World Energy Visualization"}/>
        </div>

        <div className="item-selection">
          <TextBox 
            parentCountryOne = {countryOne}
            parentCountryTwo = {countryTwo}
            yearRange = {yearRange}
            setParentCountryOne={setCountryOne} 
            setParentCountryTwo={setCountryTwo}
          />
        </div>

        <div className="item-slider">
          <SliderInput setParentYearRange={setYearRange} />
        </div>

        <div className="item-button">
          <ButtonInput setParentAbsolute={setIsAbsolute} parentAbsolute={isAbsolute}/>
        </div>
        
        <div className="item-map">
          <WorldMap 
            data={mapData} 
            parentCountryOne = {countryOne}
            parentCountryTwo = {countryTwo}
            yearRange = {yearRange}
            setParentCountryOne={setCountryOne} 
            setParentCountryTwo={setCountryTwo}/>
        </div>

        <div className="item-graphs">
          <Graphs countryOne={countryOne} countryTwo={countryTwo} yearRange={yearRange} isOnlyPercentage={isAbsolute}/>
        </div>

    </section>
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