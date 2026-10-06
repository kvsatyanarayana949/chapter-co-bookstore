import { Link, useLocation } from 'react-router-dom';
import { formatPrice } from '../utils/helpers.js';

const LATEST_ORDER_KEY = 'chapter-co-latest-order';

function getStoredOrder() {
  try {
    const saved = globalThis.sessionStorage?.getItem(LATEST_ORDER_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export default function OrderSuccess() {
  const { state } = useLocation();
  const order = state?.id ? state : getStoredOrder();

  if (!order?.id) {
    return (
      <section className="page-section container">
        <div className="success-panel">
          <p className="eyebrow">Order not found</p>
          <h1>No recent order is available.</h1>
          <p>Start a new order from the catalogue and your confirmation details will appear here after checkout.</p>
          <Link className="button large" to="/books">Browse Books</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section container">
      <div className="success-panel">
        <p className="eyebrow">Order confirmed</p>
        <h1>Thank you, {order.customer}.</h1>
        <p>Your order has been placed successfully. A confirmation message would be sent to the customer in a production checkout.</p>
        <div className="confirmation-box">
          <div>
            <span>Order ID</span>
            <strong>{order.id}</strong>
          </div>
          <div>
            <span>Items</span>
            <strong>{order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0}</strong>
          </div>
          <div>
            <span>Shipping</span>
            <strong>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</strong>
          </div>
          <div>
            <span>Order Total</span>
            <strong>{formatPrice(order.total)}</strong>
          </div>
        </div>
        <div className="hero-actions success-actions">
          <Link className="button large" to="/books">Continue Shopping</Link>
          <Link className="button ghost large" to="/">Return Home</Link>
        </div>
      </div>
    </section>
  );
}
