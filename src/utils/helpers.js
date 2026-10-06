export const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function formatPrice(value) {
  return currency.format(value);
}

export function getDiscountPercentage(price, originalPrice) {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function calculateCart(items) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = items.reduce((sum, item) => sum + Math.max(item.originalPrice - item.price, 0) * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 999 ? 0 : 79;
  const total = subtotal + shipping;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { subtotal, savings, shipping, total, itemCount };
}

export function generateOrderId() {
  if (globalThis.crypto?.randomUUID) {
    return `CC-${globalThis.crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  }

  return `CC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export function fallbackCover(title = 'Book cover') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="540" viewBox="0 0 360 540"><rect width="360" height="540" fill="#e9eef3"/><rect x="36" y="42" width="288" height="456" rx="18" fill="#2f4858"/><text x="180" y="246" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#ffffff">Chapter & Co.</text><text x="180" y="292" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#d8e6ee">${title.slice(0, 26)}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
