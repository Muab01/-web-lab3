import { Routes, Route } from 'react-router-dom';
/* import Header from './components/Header'; */
import Home from '../pages/Home';
import Menu from '../components/Menu';
import Cart from '../components/Cart';
import Order from '../pages/Order'
import OrderStatus from '../pages/OrderStatus';

const App: React.FC = () => {
  return (
    <Routes>

    
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart/" element={<Cart cartId={1} />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order-status" element={<OrderStatus />} />


    </Routes>
    
  );
};

export default App;
