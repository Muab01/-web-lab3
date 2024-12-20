import React, { useState } from 'react';

interface CartProps {
  cartId: number;
}

const Cart: React.FC<CartProps> = ({ cartId }) => {
  const [items, setItems] = useState<number>(0);

  const handleAddToCart = () => {
    setItems(items + 1);
  };

  return (
    <div>
      <p>Cart ID: {cartId}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      {items === 0 ? <p>Cart is empty</p> : <p>{items} pasta/dish in cart</p>}
    </div>
  );
};

export default Cart;
