import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { fallbackCover, formatPrice } from '../utils/helpers.js';

export default function CartItem({ item }) {
  const { decreaseQuantity, increaseQuantity, removeFromCart } = useCart();

  return (
    <article className="cart-item">
      <Link to={`/books/${item.id}`} className="cart-thumb">
        <img src={item.coverImage} alt={`${item.title} cover`} onError={(event) => { event.currentTarget.src = fallbackCover(item.title); }} />
      </Link>
      <div className="cart-copy">
        <h2>{item.title}</h2>
        <p className="muted">by {item.author}</p>
        <p>{formatPrice(item.price)}</p>
      </div>
      <div className="quantity-control" aria-label={`Quantity for ${item.title}`}>
        <button type="button" onClick={() => decreaseQuantity(item.id)} disabled={item.quantity <= 1} aria-label={`Decrease quantity of ${item.title}`}>−</button>
        <span aria-live="polite">{item.quantity}</span>
        <button type="button" onClick={() => increaseQuantity(item.id)} disabled={item.quantity >= item.stock} aria-label={`Increase quantity of ${item.title}`}>+</button>
      </div>
      <strong className="item-subtotal">{formatPrice(item.price * item.quantity)}</strong>
      <button className="remove-button" type="button" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.title} from cart`}>Remove</button>
    </article>
  );
}
