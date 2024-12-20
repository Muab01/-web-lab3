import { useState, useEffect } from 'react';

interface CartProps {
  cartId: number;
}

interface Item {
  id: number;
  name: string;
  price: number;
}

const Cart: React.FC<CartProps> = ({ cartId }) => {
  const [menuItems, setMenuItems] = useState<Item[]>([]);
  const [cartItem, setCartItem] = useState<Item | null>(null);

  // Hämta menydata när komponenten monteras
  useEffect(() => {
    fetch('/api/menu')
      .then((response) => response.json())
      .then((data) => setMenuItems(data))
      .catch((error) => console.error('Error fetching menu:', error));
  }, []);

  // Funktion för att lägga till en vara i kundvagnen
  const handleAddToCart = (item: Item) => {
    setCartItem(item);
  };

  return (
    <div>
      <h2>Kundvagn #{cartId}</h2>
      <h3>Meny</h3>
      {menuItems.slice(0, 1).map((item) => (
        <button
          key={item.id}
          data-cy="add-to-cart"
          onClick={() => handleAddToCart(item)}
        >
          Lägg till {item.name} ({item.price.toFixed(2)} kr)
        </button>
      ))}

      {cartItem ? (
        <p data-cy="cart-item">{cartItem.name} har lagts till i kundvagnen</p>
      ) : (
        <p data-cy="cart-empty">Kundvagnen är tom</p>
      )}
    </div>
  );
};

export default Cart;
