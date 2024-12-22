import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Order.css';
import Header from '../components/Header';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Order: React.FC = () => {
  const location = useLocation();
  const { totalPrice = 0, cartItems = [] }: { totalPrice: number; cartItems: CartItem[] } = location.state || {};

  const [customerName, setCustomerName] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [pickupOrDineIn, setPickupOrDineIn] = useState<'Pickup' | 'Dine-In'>('Pickup');
  const navigate = useNavigate();

  const handleOrderSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_name: customerName,
          customer_contact: customerContact,
          pickup_or_dine_in: pickupOrDineIn,
          total_price: totalPrice,
          items: cartItems,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the order');
      }

      const orderDetails = await response.json();
      navigate('/order-status', { state: { orderDetails, pickupOrDineIn, cartItems, totalPrice } });
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit the order.');
    }
  };

  return (
    <div className="order-page">
      <Header />
      <h2>Ready to Order?</h2>
      <p>Please provide your details to complete the order:</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOrderSubmit();
        }}
      >
        <label>
          Full Name:
          <input
            type="text"
            name="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
             name="customerContact"
            value={customerContact}
            onChange={(e) => setCustomerContact(e.target.value)}
            required
          />
        </label>
        <label>
          Pickup or Dine-In:
          <select
            name="pickupOrDineIn"
            value={pickupOrDineIn}
            onChange={(e) => setPickupOrDineIn(e.target.value as 'Pickup' | 'Dine-In')}
          >
            <option value="Pickup">Pickup</option>
            <option value="Dine-In">Dine-In</option>
          </select>
        </label>
        <button type="submit" className="btn">
          Order Now for ${totalPrice.toFixed(2)}
        </button>
      </form>
    </div>
  );
};

export default Order;
