import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem.jsx';
import EmptyState from '../components/EmptyState.jsx';
import OrderSummary from '../components/OrderSummary.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <div className="container page-section">
        <EmptyState
          title="Your cart is empty"
          message="Add a few books to see item subtotals, discounts, shipping, and checkout actions."
          action={<Link className="button" to="/books">Continue Shopping</Link>}
        />
      </div>
    );
  }

  return (
    <section className="page-section container">
      <div className="page-heading compact">
        <p className="eyebrow">Shopping cart</p>
        <h1>Your Cart</h1>
      </div>
      <div className="cart-layout">
        <div className="cart-list">
          {items.map((item) => <CartItem key={item.id} item={item} />)}
        </div>
        <OrderSummary items={items} action={<Link className="button full-width" to="/checkout">Proceed to Checkout</Link>} />
      </div>
    </section>
  );
}
