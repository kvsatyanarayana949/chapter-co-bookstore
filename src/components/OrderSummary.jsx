import { calculateCart, formatPrice } from '../utils/helpers.js';

export default function OrderSummary({ items, action }) {
  const totals = calculateCart(items);

  return (
    <section className="summary-panel" aria-label="Order summary">
      <h2>Order Summary</h2>
      <div className="summary-line">
        <span>Subtotal</span>
        <strong>{formatPrice(totals.subtotal)}</strong>
      </div>
      <div className="summary-line">
        <span>You save</span>
        <strong>{totals.savings > 0 ? `Save ${formatPrice(totals.savings)}` : formatPrice(0)}</strong>
      </div>
      <div className="summary-line">
        <span>Shipping</span>
        <strong>{totals.shipping === 0 ? 'Free' : formatPrice(totals.shipping)}</strong>
      </div>
      <div className="summary-total">
        <span>Total</span>
        <strong>{formatPrice(totals.total)}</strong>
      </div>
      {action}
    </section>
  );
}
