import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { fallbackCover, formatPrice, getDiscountPercentage } from '../utils/helpers.js';

export default function BookCard({ book }) {
  const { addToCart } = useCart();
  const discount = getDiscountPercentage(book.price, book.originalPrice);

  return (
    <article className="book-card">
      <Link className="book-cover-link" to={`/books/${book.id}`} aria-label={`View details for ${book.title}`}>
        <img src={book.coverImage} alt={`${book.title} cover`} onError={(event) => { event.currentTarget.src = fallbackCover(book.title); }} />
      </Link>
      <div className="book-card-body">
        <p className="eyebrow">{book.category}</p>
        <h2>{book.title}</h2>
        <p className="muted">by {book.author}</p>
        <p className="rating" aria-label={`Rated ${book.rating} out of 5`}>
          <span>★</span> {book.rating} <span className="muted">({book.reviews})</span>
        </p>
        <div className="price-row">
          <strong>{formatPrice(book.price)}</strong>
          {book.originalPrice > book.price && <span className="strike">{formatPrice(book.originalPrice)}</span>}
          {discount > 0 && <span className="discount">{discount}% off</span>}
        </div>
      </div>
      <div className="book-actions">
        <Link className="button secondary" to={`/books/${book.id}`}>View Details</Link>
        <button className="button" type="button" onClick={() => addToCart(book)} disabled={book.stock < 1}>
          {book.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </article>
  );
}
