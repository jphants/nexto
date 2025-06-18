import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import { Header } from './components/header'
import { BusinessRegisterForm } from './pages/RegisterBusiness'
import { LoginBusiness } from "./pages/LoginBusiness"
import { NewAdd } from "./pages/NewAdd" // suponiendo que creás ese archivo
import { AdsNearby } from "./pages/Ads"
import Map   from "./components/Map"
export const App = () => {
  return (
    <Router>
      <Header />
      <Map />
      <Routes>
        <Route path="/register/business" element={<BusinessRegisterForm />} />
        <Route path="/Map" element={<Map />} />
        <Route path="/ads" element={<AdsNearby />} />
        <Route path="/login/business" element={<LoginBusiness />} />
        <Route path="/newadd" element={<NewAdd />} />
        {/* Puedes agregar una ruta raíz o 404 */}
      </Routes>
    </Router>
  )
}

export default App
