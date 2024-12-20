interface CartProps {
  cartId: number;
}

const Cart: React.FC<CartProps> = ({ cartId }) => {
  return <p>Cart ID: {cartId}</p>;
};

export default Cart;
