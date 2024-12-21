import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CartProps {
  cartId: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}



const Cart: React.FC<CartProps> = ({ cartId }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/cart/${cartId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cart items.');
        }
        const data = await response.json();
        setCartItems(data);

       
        const total = data.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [cartId]);

  
  const handleClearCart = async () => {
    try {
      await fetch(`http://localhost:3000/api/cart/${cartId}`, {
        method: 'DELETE',
      });
      setCartItems([]);
      setTotalPrice(0);
      alert('Cart has been cleared!');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  
  const handleOrderPasta = () => {
    navigate('/order', { state: { cartItems, totalPrice } });
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                <p className="cart-item-price">
                  Price: ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <p className="cart-total">Total: ${totalPrice.toFixed(2)}</p>
          <button className="btn order-btn" onClick={handleOrderPasta}>
            Order Pasta
          </button>
          <button className="btn clear-btn" onClick={handleClearCart}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
