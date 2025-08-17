import './App.css'
import Home from './pages/home'
import MapPage from './pages/mapPage';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Outlet /> {/*<Outlet /> ist der Platzhalter für die verschachtelten Routen (Home, Organisation) */}
    </div>
  );
}

export default App;
