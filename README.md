# Chapter & Co. Interactive Bookstore

Chapter & Co. is a polished React bookstore application built for a portfolio-ready e-commerce experience. Users can browse a realistic book catalogue, search and filter titles, view detailed book pages, manage a persistent cart, complete a validated checkout flow, and receive an order confirmation.

## Features

- Responsive home page with hero, featured books, categories, benefits, and call to action
- Book catalogue with combined search, category, price, rating, and sorting controls
- Book detail pages with stock status, quantity selection, related books, and invalid-book handling
- Shopping cart with add, remove, increase, decrease, item totals, discounts, shipping, and final total
- Cart persistence using browser `localStorage`
- Checkout form with accessible labels and client-side validation
- Simulated order confirmation with generated order ID, order total, and refresh-safe `sessionStorage` recovery
- Professional empty states, invalid route handling, and image fallback behavior
- Clean responsive layout for mobile, tablet, laptop, desktop, and large desktop screens

## Technology Stack

- HTML5
- CSS3
- JavaScript ES6+
- React.js
- React Router DOM
- Vite

State management is implemented with React's built-in `useState`, `useEffect`, `useMemo`, Context API, props, and plain JavaScript helpers. No external state-management library is used.

## Project Structure

```text
src/
├── components/        Reusable navigation, book, cart, summary, and state components
├── context/           React cart context with localStorage persistence
├── data/              Local bookstore dataset
├── pages/             Route-level views
├── utils/             Price formatting, totals, discounts, and order helpers
├── App.jsx            Application routes
├── main.jsx           React entry point
└── index.css          Design system and responsive styling
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173/
```

## Production Build

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment To Vercel

1. Push the project to GitHub.
2. Create a new Vercel project from the GitHub repository.
3. Use the default Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. The included `vercel.json` rewrites all routes to `index.html` so React Router direct navigation works.

## Push To GitHub

```bash
git init
git add .
git commit -m "feat: build interactive bookstore app"
git branch -M main
git remote add origin https://github.com/your-username/your-repository.git
git push -u origin main
```

## Important Implementation Details

- Cart state is owned by `CartContext` and persisted safely in `localStorage`.
- Cart totals are derived with helper functions instead of duplicated state.
- Book data is local and imported directly from `src/data/books.js`.
- Checkout is frontend-only and does not process real payments.
- The latest simulated order is stored in `sessionStorage` so the confirmation page survives refresh during the same browser session.
- Broken book cover images fall back to a generated accessible placeholder.
- Vercel and Netlify SPA routing support are included through `vercel.json` and `public/_redirects`.

## Future Improvements

- Add unit tests for filtering, cart behavior, and checkout validation
- Add wishlist and recently viewed books
- Add an API-backed catalogue
- Add user accounts and order history with a real backend

## Author

Add your name and GitHub profile here.
