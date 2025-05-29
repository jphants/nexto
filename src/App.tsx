
import './App.css'
import Map from './components/map'
import Header from './components/header'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import FormPage from './pages/formPage';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/formPage" element={<FormPage />} />
        <Route path="/" element={<Map />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
