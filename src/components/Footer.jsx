import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand footer-brand" to="/">
            <span className="brand-mark">C</span>
            <span>Chapter & Co.</span>
          </Link>
          <p>Curated books, practical prices, and a calm buying experience for readers who know what they like and love discovering what is next.</p>
        </div>
        <div>
          <h2>Browse</h2>
          <Link to="/books">All Books</Link>
          <Link to="/books?category=Technology">Technology</Link>
          <Link to="/books?category=Fantasy">Fantasy</Link>
        </div>
        <div>
          <h2>Support</h2>
          <p>Email: hello@chapterco.example</p>
          <p>Shipping across India on orders over ₹999.</p>
        </div>
      </div>
    </footer>
  );
}
