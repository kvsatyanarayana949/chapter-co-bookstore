import { categories } from '../data/books.js';

const priceRanges = [
  { label: 'All prices', value: 'all' },
  { label: 'Under ₹400', value: '0-400' },
  { label: '₹400 to ₹600', value: '400-600' },
  { label: '₹600 to ₹900', value: '600-900' },
  { label: 'Above ₹900', value: '900-99999' },
];

export default function FilterPanel({ filters, onChange, onReset }) {
  function toggleCategory(category) {
    const next = filters.categories.includes(category)
      ? filters.categories.filter((item) => item !== category)
      : [...filters.categories, category];
    onChange({ ...filters, categories: next });
  }

  return (
    <aside className="filter-panel" aria-label="Book filters">
      <div className="filter-heading">
        <h2>Filters</h2>
        <button type="button" className="text-button" onClick={onReset}>Reset</button>
      </div>

      <div className="filter-group">
        <label htmlFor="book-search">Search</label>
        <input id="book-search" value={filters.search} onChange={(event) => onChange({ ...filters, search: event.target.value })} placeholder="Title, author, category" />
      </div>

      <fieldset className="filter-group">
        <legend>Category</legend>
        {categories.map((category) => (
          <label className="check-row" key={category}>
            <input type="checkbox" checked={filters.categories.includes(category)} onChange={() => toggleCategory(category)} />
            <span>{category}</span>
          </label>
        ))}
      </fieldset>

      <div className="filter-group">
        <label htmlFor="price-range">Price</label>
        <select id="price-range" value={filters.priceRange} onChange={(event) => onChange({ ...filters, priceRange: event.target.value })}>
          {priceRanges.map((range) => <option key={range.value} value={range.value}>{range.label}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="rating-filter">Minimum rating</label>
        <select id="rating-filter" value={filters.rating} onChange={(event) => onChange({ ...filters, rating: Number(event.target.value) })}>
          <option value="0">Any rating</option>
          <option value="4">4.0 and up</option>
          <option value="4.5">4.5 and up</option>
          <option value="4.7">4.7 and up</option>
        </select>
      </div>
    </aside>
  );
}
