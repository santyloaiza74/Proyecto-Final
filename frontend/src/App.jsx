import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import InfoEnergia from './pages/Infoenergia'
import Graficos from './pages/Graficos'
import EstimadorRenovable from './pages/EstimadorRenovable'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={InfoEnergia}></Route>
        <Route path='/Graficos' Component={Graficos}></Route>
        <Route path='/Estimador' Component={EstimadorRenovable}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
