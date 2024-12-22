import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="title-logo">Pasta Bella</div>
        <ul className="nav-links">
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link> 
          </li>
        </ul>
      </nav>
      <video className="background-video" autoPlay muted loop>
        <source src="/videos/landingpage.mp4" type="video/mp4" />
      </video>
      <div className="landing-text">
        <em>The finest pasta.</em><br />
        <span className="home-highlight">
          Fresh ingredients, authentic taste.
        </span>
      </div>
    </div>
  );
};

export default Home;
