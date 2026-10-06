import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard.jsx';
import { books, categories } from '../data/books.js';

const benefits = [
  ['Curated Collection', 'Hand-picked fiction, technology, business, and personal growth titles.'],
  ['Affordable Prices', 'Clear discounts and free shipping on orders above ₹999.'],
  ['Fast Delivery', 'Reliable fulfillment flows designed like a real online store.'],
  ['Secure Checkout', 'Accessible, validated checkout with simulated safe payment handling.'],
];

export default function Home() {
  const featured = [...books].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Modern bookstore for thoughtful readers</p>
            <h1>Discover Your Next Great Read</h1>
            <p>Explore stories, ideas, and practical knowledge from a curated catalogue built for quick discovery and confident checkout.</p>
            <div className="hero-actions">
              <Link className="button large" to="/books">Explore Books</Link>
              <Link className="button ghost large" to="/books?category=Technology">Browse Technology</Link>
            </div>
          </div>
          <div className="hero-stack" aria-label="Featured bookstore covers">
            {featured.slice(0, 3).map((book) => (
              <img key={book.id} src={book.coverImage} alt={`${book.title} cover`} />
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Featured books</p>
            <h2>Reader favourites this week</h2>
          </div>
          <Link className="text-button" to="/books">View all books</Link>
        </div>
        <div className="book-grid">
          {featured.map((book) => <BookCard key={book.id} book={book} />)}
        </div>
      </section>

      <section className="section category-band">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Popular categories</p>
              <h2>Find the shelf that fits your mood</h2>
            </div>
          </div>
          <div className="category-grid">
            {categories.slice(0, 8).map((category) => (
              <Link to={`/books?category=${encodeURIComponent(category)}`} className="category-card" key={category}>
                <span>{category}</span>
                <small>Explore titles</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="benefits-grid">
          {benefits.map(([title, text]) => (
            <article className="benefit-card" key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-content">
          <div>
            <p className="eyebrow">Ready to build your stack?</p>
            <h2>Shop bestselling books with a checkout flow that feels complete.</h2>
          </div>
          <Link className="button large" to="/books">Start Shopping</Link>
        </div>
      </section>
    </>
  );
}
