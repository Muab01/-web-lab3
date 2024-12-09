import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header: React.FC = () => {
  return (
    <header className="header-container">
      <Link to="/" className="header-logo">
       Pasta Bella
      </Link>
    </header>
  );
};

export default Header;
