import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/OrderStatus.css';
import Header from '../components/Header'; 

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const OrderStatus: React.FC = () => {
  const location = useLocation();
  const { pickupOrDineIn, cartItems = [], totalPrice = 0 } = location.state || {};

  // Debuggar lite, vill se vad som händer här
  console.log('Location State:', location.state);
  console.log('Cart Items:', cartItems);
  console.log('Pickup or Dine-In:', pickupOrDineIn);
  console.log('Total Price:', totalPrice);

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [estimatedTime, setEstimatedTime] = useState<string>('');

  useEffect(() => {
    const prepTime = Math.floor(Math.random() * 26) + 25;
    setTimeLeft(prepTime);

    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + prepTime);
    setEstimatedTime(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, []);


  return (
    <div className="order-status-page">
      <Header /> 

      <div className="order-status-content">
        <h2>Order Status</h2>
        <p>Preparing your order...</p>
        <p>Only {timeLeft} minutes left!</p>
        <p>
          Estimated {pickupOrDineIn === 'Pickup' ? 'pickup' : 'delivery'}: {new Date().toLocaleDateString()},{' '}
          {estimatedTime}
        </p>

        <div className="order-summary">
          <h3>Order Summary:</h3>
          <ul>
            {cartItems.map((item: CartItem) => {
             console.log("Rendering item:", item); 
             return (
               <li key={item.id}>
               {item.quantity}× {item.name} - ${item.price.toFixed(2)}
               </li>
              );
          })}
      </ul>
         <p>Price for your order: ${totalPrice.toFixed(2)}</p>
          <p>To pay on {pickupOrDineIn.toLowerCase()}: ${totalPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
