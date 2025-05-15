import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Principal from './pages/Principal'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Principal}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
