interface CartProps {
  cartId: number;
}

const Cart: React.FC<CartProps> = ({ cartId }) => {
  return (
    <div>
      <p>Cart ID: {cartId}</p>
      <p>Cart is empty</p>
    </div>
  );
};

export default Cart;
