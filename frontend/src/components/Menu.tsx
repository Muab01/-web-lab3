import { useEffect, useState } from 'react';
import '../styles/Menu.css';
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number | string;
  image_url: string;
}

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/menu');
        if (!response.ok) {
          throw new Error('Network response was not ok!!');
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError('Failed to fetch menu.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="menu-container">
      <header className="header">
        <h1 className="restaurant-title">Pasta Bella</h1>
      </header>

      <h2 className="menu-title">Our Menu</h2>
      <p className="menu-description">
        Authentic Italian cuisine. Creative dishes to choose from. All from our stone oven, all organic, all delicious.
      </p>
      
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li key={item.id} className="menu-item">
            <h3 className="menu-item-name">{item.name}</h3>
            <p className="menu-item-description">{item.description}</p>
            <p className="menu-item-price">Price: ${Number(item.price).toFixed(2)}</p>
            <img
              src={`http://localhost:3000${item.image_url}`}
              alt={item.name}
              className="menu-item-image"
            />
            <button className="btn">Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
