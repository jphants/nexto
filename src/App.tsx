import './App.css'
import Map from './components/map'
import Header from './components/header'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import FormPage from './pages/formPage';
import WelcomePage from './pages/WelcomePage';
import MainPage from './pages/MainPage';

const AppRoutes = () => {
  const location = useLocation();
  const isWelcomePage = location.pathname === '/';

  return (
    <>
      {!isWelcomePage && <Header />}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/formPage" element={<FormPage />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
