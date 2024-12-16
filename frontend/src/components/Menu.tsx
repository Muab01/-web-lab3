import  { useEffect, useState } from 'react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/menu');
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Menu</h1>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <img src={item.image_url} alt={item.name} style={{ width: '200px', height: 'auto' }} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Menu;
