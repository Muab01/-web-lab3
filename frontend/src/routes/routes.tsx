import { Routes, Route } from 'react-router-dom';
/* import Header from './components/Header'; */
import Home from '../pages/Home';
import Menu from '../components/Menu';

const App: React.FC = () => {
  return (
    <Routes>

    
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    
  );
};

export default App;
