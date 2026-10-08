import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import BookCard from '../components/BookCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { useCart } from '../context/CartContext.jsx';
import { books } from '../data/books.js';
import { fallbackCover, formatPrice, getDiscountPercentage } from '../utils/helpers.js';

export default function BookDetails() {
  const { bookId } = useParams();
  const book = books.find((item) => item.id === bookId);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [cartMessage, setCartMessage] = useState('');

  if (!book) {
    return (
      <div className="container page-section">
        <EmptyState
          title="Book Not Found"
          message="The book you are looking for may have been moved or removed."
          action={<Link className="button" to="/books">Back to Books</Link>}
        />
      </div>
    );
  }

  const related = books.filter((item) => item.category === book.category && item.id !== book.id).slice(0, 4);
  const discount = getDiscountPercentage(book.price, book.originalPrice);

  return (
    <section className="page-section container">
      <Link className="text-button" to="/books">← Back to Books</Link>
      <div className="details-layout">
        <div className="details-cover">
          <img src={book.coverImage} alt={`${book.title} cover`} onError={(event) => { event.currentTarget.src = fallbackCover(book.title); }} />
        </div>
        <div className="details-copy">
          <p className="eyebrow">{book.category}</p>
          <h1>{book.title}</h1>
          <p className="muted">by {book.author}</p>
          <p className="rating"><span>★</span> {book.rating} <span className="muted">({book.reviews} reviews)</span></p>
          <p>{book.description}</p>
          <div className="price-row large-price">
            <strong>{formatPrice(book.price)}</strong>
            {book.originalPrice > book.price && <span className="strike">{formatPrice(book.originalPrice)}</span>}
            {discount > 0 && <span className="discount">{discount}% off</span>}
          </div>
          <p className={`stock ${book.stock > 0 ? 'in-stock' : 'out-stock'}`}>{book.stock > 0 ? `${book.stock} copies available` : 'Out of stock'}</p>
          <div className="detail-actions">
            <label>
              <span>Quantity</span>
              <input
                type="number"
                min="1"
                max={book.stock}
                value={quantity}
                aria-label={`Quantity for ${book.title}`}
                onChange={(event) => setQuantity(Math.max(1, Math.min(book.stock, Number(event.target.value) || 1)))}
              />
            </label>
            <button
              className="button large"
              type="button"
              disabled={book.stock < 1}
              onClick={() => {
                addToCart(book, quantity);
                setCartMessage(`${quantity} ${quantity === 1 ? 'copy' : 'copies'} of ${book.title} added to your cart.`);
              }}
            >
              Add to Cart
            </button>
          </div>
          {cartMessage && <p className="cart-feedback" role="status">{cartMessage}</p>}
        </div>
      </div>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Recommended</p>
            <h2>More in {book.category}</h2>
          </div>
        </div>
        {related.length > 0 ? (
          <div className="book-grid">
            {related.map((item) => <BookCard key={item.id} book={item} />)}
          </div>
        ) : (
          <EmptyState title="No related books yet" message="Explore the catalogue to discover more categories." />
        )}
      </section>
    </section>
  );
}
