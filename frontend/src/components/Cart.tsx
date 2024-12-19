interface CartProps {
    cartId: number;
  }
  
  const Cart: React.FC<CartProps> = ({ cartId }) => {
    return (
      <div>
        <p>Cart ID: {cartId}</p>
      </div>
    )
  }
  
  export default Cart;
  