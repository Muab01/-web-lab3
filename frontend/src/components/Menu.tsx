import React, { useEffect, useState } from 'react';
import '../styles/Menu.css';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/menu');
        if (!response.ok) {
          throw new Error('Failed to fetch menu');
        }
        const data: MenuItem[] = await response.json();
        setMenuItems(data);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError(' :( Could not load menu. Try again later!!!');
      } finally {
        setLoading(false);
      }
    };
  
    fetchMenuItems();
  }, []);

  const addToCart = async (menuItem: MenuItem) => {
    const existingItem = cartItems.find((item) => item.id === menuItem.id);

    
    if (existingItem) {
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prevCart) => [
        ...prevCart,
        { id: menuItem.id, name: menuItem.name, price: menuItem.price, quantity: 1 },
      ]);
    }

   
    try {
      await fetch('http://localhost:3000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartId: 1, 
          menuId: menuItem.id,
          quantity: 1,
        }),
      });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  const calculateTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="menu-page">
      <div className="menu-container">
        <header className="header">
          <h1 className="restaurant-title">Pasta Bella</h1>
        </header>

        <h2 className="menu-title">Our Menu</h2>
        <p className="menu-description">
          Authentic Italian cuisine. Choose from our delicious options.
        </p>

        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.id} className="menu-item">
              <h3 className="menu-item-name">{item.name}</h3>
              <p className="menu-item-description">{item.description}</p>
              <p className="menu-item-price">Price: ${item.price.toFixed(2)}</p>
              <img
                src={`http://localhost:3000${item.image_url}`}
                alt={item.name}
                className="menu-item-image"
              />
              <button
                className="btn"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>

        <div className="cart-summary">
          <h2>Your Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} x {item.quantity} - $
                  {(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
          )}
          <p>Total: ${calculateTotalPrice().toFixed(2)}</p>
          <button
            onClick={() => window.location.href = '/cart'}
            className="btn"
          >
            Open Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
