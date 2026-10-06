import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookCard from '../components/BookCard.jsx';
import FilterPanel from '../components/FilterPanel.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { books } from '../data/books.js';

const defaultFilters = {
  search: '',
  categories: [],
  priceRange: 'all',
  rating: 0,
  sort: 'featured',
};

function getFiltersFromParams(searchParams) {
  const categories = searchParams.get('category')
    ? searchParams.get('category').split(',').map((category) => category.trim()).filter(Boolean)
    : [];

  return {
    ...defaultFilters,
    search: searchParams.get('q') || '',
    categories,
  };
}

function buildSearchParams(filters) {
  const params = {};
  const search = filters.search.trim();

  if (search) params.q = search;
  if (filters.categories.length > 0) params.category = filters.categories.join(',');

  return params;
}

export default function Books() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(() => getFiltersFromParams(searchParams));

  useEffect(() => {
    const next = getFiltersFromParams(searchParams);
    setFilters((current) => ({ ...current, search: next.search, categories: next.categories }));
  }, [searchParams]);

  const visibleBooks = useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    const [minPrice, maxPrice] = filters.priceRange === 'all' ? [0, Infinity] : filters.priceRange.split('-').map(Number);

    return books
      .filter((book) => {
        const searchable = `${book.title} ${book.author} ${book.category}`.toLowerCase();
        return !search || searchable.includes(search);
      })
      .filter((book) => filters.categories.length === 0 || filters.categories.includes(book.category))
      .filter((book) => book.price >= minPrice && book.price <= maxPrice)
      .filter((book) => book.rating >= filters.rating)
      .sort((a, b) => {
        if (filters.sort === 'price-asc') return a.price - b.price;
        if (filters.sort === 'price-desc') return b.price - a.price;
        if (filters.sort === 'rating-desc') return b.rating - a.rating;
        if (filters.sort === 'title-asc') return a.title.localeCompare(b.title);
        return b.rating - a.rating || a.title.localeCompare(b.title);
      });
  }, [books, filters]);

  function updateFilters(next) {
    setFilters(next);
    setSearchParams(buildSearchParams(next));
  }

  return (
    <section className="page-section container">
      <div className="page-heading">
        <p className="eyebrow">Complete catalogue</p>
        <h1>Browse Books</h1>
        <p>Search, filter, and sort the catalogue. All controls work together and update the grid immediately.</p>
      </div>

      <div className="catalog-layout">
        <FilterPanel filters={filters} onChange={updateFilters} onReset={() => updateFilters(defaultFilters)} />
        <div className="catalog-results">
          <div className="results-toolbar">
            <p>{visibleBooks.length} {visibleBooks.length === 1 ? 'book' : 'books'} found</p>
            <label>
              <span>Sort by</span>
              <select value={filters.sort} onChange={(event) => setFilters({ ...filters, sort: event.target.value })}>
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: High to Low</option>
                <option value="title-asc">Title: A-Z</option>
              </select>
            </label>
          </div>

          {visibleBooks.length > 0 ? (
            <div className="book-grid">
              {visibleBooks.map((book) => <BookCard key={book.id} book={book} />)}
            </div>
          ) : (
            <EmptyState
              title="No books found"
              message="No books match your current filters. Adjust your search or clear the filters to browse the full catalogue."
              action={<button className="button" type="button" onClick={() => updateFilters(defaultFilters)}>Clear Filters</button>}
            />
          )}
        </div>
      </div>
    </section>
  );
}
