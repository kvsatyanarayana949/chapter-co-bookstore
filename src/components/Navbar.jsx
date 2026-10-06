import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { calculateCart } from '../utils/helpers.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState('');
  const { items } = useCart();
  const { itemCount } = calculateCart(items);
  const navigate = useNavigate();

  function submitSearch(event) {
    event.preventDefault();
    navigate(`/books${term.trim() ? `?q=${encodeURIComponent(term.trim())}` : ''}`);
    setOpen(false);
  }

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-mark">C</span>
          <span>Chapter & Co.</span>
        </Link>

        <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-panel ${open ? 'is-open' : ''}`}>
          <div className="nav-links">
            <NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/books" onClick={() => setOpen(false)}>Books</NavLink>
            <NavLink to="/cart" onClick={() => setOpen(false)}>Cart</NavLink>
          </div>

          <form className="nav-search" onSubmit={submitSearch}>
            <label className="sr-only" htmlFor="nav-search">Search books</label>
            <input id="nav-search" value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Search title, author, category" autoComplete="off" />
            <button type="submit">Search</button>
          </form>

          <Link className="cart-link" to="/cart" onClick={() => setOpen(false)} aria-label={`Cart with ${itemCount} items`}>
            Cart <span>{itemCount}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
