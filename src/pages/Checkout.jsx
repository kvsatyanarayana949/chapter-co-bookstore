import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmptyState from '../components/EmptyState.jsx';
import OrderSummary from '../components/OrderSummary.jsx';
import { useCart } from '../context/CartContext.jsx';
import { calculateCart, generateOrderId } from '../utils/helpers.js';

const LATEST_ORDER_KEY = 'chapter-co-latest-order';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  paymentMethod: '',
};

function validate(values) {
  const errors = {};
  if (values.fullName.trim().length < 3) errors.fullName = 'Enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email address.';
  if (!/^[6-9]\d{9}$/.test(values.phone.replace(/\D/g, ''))) errors.phone = 'Enter a valid 10-digit Indian mobile number.';
  if (values.address.trim().length < 8) errors.address = 'Enter a complete delivery address.';
  if (!values.city.trim()) errors.city = 'City is required.';
  if (!values.state.trim()) errors.state = 'State is required.';
  if (!/^\d{6}$/.test(values.postalCode.trim())) errors.postalCode = 'Enter a valid 6-digit PIN code.';
  if (!values.paymentMethod) errors.paymentMethod = 'Choose a payment method.';
  return errors;
}

export default function Checkout() {
  const { items, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const totals = useMemo(() => calculateCart(items), [items]);

  if (items.length === 0) {
    return (
      <div className="container page-section">
        <EmptyState
          title="Checkout needs a cart"
          message="Add books to your cart before entering order information."
          action={<Link className="button" to="/books">Browse Books</Link>}
        />
      </div>
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }));
  }

  function submitOrder(event) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const order = {
      id: generateOrderId(),
      total: totals.total,
      subtotal: totals.subtotal,
      savings: totals.savings,
      shipping: totals.shipping,
      customer: form.fullName,
      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        author: item.author,
        quantity: item.quantity,
        price: item.price,
      })),
      placedAt: new Date().toISOString(),
    };
    globalThis.sessionStorage?.setItem(LATEST_ORDER_KEY, JSON.stringify(order));
    clearCart();
    navigate('/order-confirmation', { state: order, replace: true });
  }

  return (
    <section className="page-section container">
      <div className="page-heading compact">
        <p className="eyebrow">Secure simulated checkout</p>
        <h1>Checkout</h1>
        <p>No real payment is processed. This frontend flow safely validates order details.</p>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={submitOrder} noValidate>
          <div className="form-grid">
            <Field label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} autoComplete="name" placeholder="Aarav Mehta" />
            <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} autoComplete="email" placeholder="you@example.com" />
            <Field label="Phone Number" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} autoComplete="tel" inputMode="numeric" placeholder="9876543210" maxLength="10" />
            <Field label="Address" name="address" value={form.address} onChange={handleChange} error={errors.address} autoComplete="street-address" placeholder="House number, street, area" wide />
            <Field label="City" name="city" value={form.city} onChange={handleChange} error={errors.city} autoComplete="address-level2" placeholder="Mumbai" />
            <Field label="State" name="state" value={form.state} onChange={handleChange} error={errors.state} autoComplete="address-level1" placeholder="Maharashtra" />
            <Field label="PIN Code" name="postalCode" value={form.postalCode} onChange={handleChange} error={errors.postalCode} autoComplete="postal-code" inputMode="numeric" placeholder="400001" maxLength="6" />
          </div>

          <fieldset className="payment-options">
            <legend>Payment Method</legend>
            {['Cash on Delivery', 'Credit/Debit Card', 'UPI'].map((method) => (
              <label key={method}>
                <input type="radio" name="paymentMethod" value={method} checked={form.paymentMethod === method} onChange={handleChange} />
                <span>{method}</span>
              </label>
            ))}
            {errors.paymentMethod && <p className="field-error">{errors.paymentMethod}</p>}
          </fieldset>

          <button className="button large full-width" type="submit">Place Order</button>
        </form>

        <OrderSummary items={items} />
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, error, type = 'text', wide = false, autoComplete, inputMode, placeholder, maxLength }) {
  return (
    <label className={`field ${wide ? 'wide' : ''}`}>
      <span>{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && <small className="field-error" id={`${name}-error`}>{error}</small>}
    </label>
  );
}
