//React Imports
import { useState, useEffect} from 'react';

//Dashboard Imports
import EnergyMatrixDashboard from './DashBoards/EnergyMatrixDashboard';

function App() { 

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [])

  //First loading animation
  if(isLoading){
    return (
      <div className="entrance">
        <div className="loading-frame">
          <h1 className="loading-icon">🌍</h1>
          <h1 className="loading-text">World Energy Visualization.</h1>
        </div>
      </div>
    )
  }else{
    return (
        <EnergyMatrixDashboard/>
    );
  }
}

export default App;