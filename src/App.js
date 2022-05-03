//Custom Components
import Title from './components/Title'
import WorldMap from './components/WorldMap'
import Graphs from './components/Graphs'

import data from "./worldMap.geo.json";

function App() {
  return (
    <div>

      <section className="container">

        <div className="item-map">
          <WorldMap data={data}/>
        </div>

        <div className="item-title">
          <Title text="World Energy Visualization"/>
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