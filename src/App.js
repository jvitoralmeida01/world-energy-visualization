//Custom Components
import Title from './components/Title'
import World from './components/World'
import Graphs from './components/Graphs'

function App() {
  return (
    <div>
      <div className="world-map">
        <World />
      </div>

      <section className="container">

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
