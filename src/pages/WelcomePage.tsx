import { Link } from "react-router-dom";
import "./welcome.css"

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <h1 className="site-name">NEXTO</h1>
      <h2 className="slogan">Explora. Descubre. Comparte.</h2>
      <div className="welcome-buttons">
        <Link to="/login" className="welcome-btn">Login</Link>
        <Link to="/register" className="welcome-btn">Register</Link>
      </div>
    </div>
  );
};

export default WelcomePage;
