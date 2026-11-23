/* Shared interactions; no dependencies, backend, or build step. */
'use strict';
const one = (selector, root = document) => root.querySelector(selector);
const all = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const storage = {
  read(key, fallback) { try { const value = localStorage.getItem(key); return value === null ? fallback : JSON.parse(value); } catch { return fallback; } },
  write(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Website remains usable when browser storage is unavailable. */ } }
};
function setTheme(dark) {
  document.body.classList.toggle('dark', dark);
  all('.theme-toggle').forEach(button => { button.textContent = dark ? '☀️' : '🌙'; button.setAttribute('aria-pressed', String(dark)); });
}
setTheme(storage.read('malik-theme-v2', false) === true);
all('.theme-toggle').forEach(button => button.addEventListener('click', () => { const dark = !document.body.classList.contains('dark'); setTheme(dark); storage.write('malik-theme-v2', dark); }));
all('.back-top').forEach(button => button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })));
const params = new URLSearchParams(location.search);
all('.contact-form').forEach(form => {
  if (params.get('product')) form.elements.message.value = 'I am interested in ' + params.get('product').slice(0, 100) + '. Please share more details.';
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const status = one('.form-status', form); status.hidden = false;
    status.textContent = 'Thank you, ' + form.elements.name.value.trim() + '! This is a demo confirmation. Your message has not been sent.';
  });
});
all('.autofill').forEach(button => button.addEventListener('click', () => {
  const form = one('form', button.closest('.form-container'));
  form.elements.name.value = 'Ali'; form.elements.email.value = 'ali@example.com'; form.elements.message.value = 'I am interested in your products.';
  one('.form-status', form).hidden = true; form.elements.name.focus();
}));
const search = one('#product-search');
if (search) search.addEventListener('input', () => {
  let matches = 0;
  all('.product-card').forEach(card => { card.hidden = !card.dataset.name.includes(search.value.trim().toLowerCase()); if (!card.hidden) matches++; });
  one('#no-results').hidden = matches !== 0;
});
all('.buy-now').forEach(button => button.addEventListener('click', () => {
  one('#purchase-title').textContent = button.dataset.product;
  one('#inquiry-link').href = 'Contact.html?product=' + encodeURIComponent(button.dataset.product);
  one('#purchase-dialog').showModal();
}));
all('.gallery-item').forEach(button => button.addEventListener('click', () => {
  const source = one('img', button); const dialog = one('#lightbox');
  one('img', dialog).src = source.src; one('img', dialog).alt = source.alt; one('p', dialog).textContent = source.alt;
  dialog.showModal();
}));
all('.dialog-close').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
all('dialog').forEach(dialog => dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } }));
const chat = one('.chat-panel'), chatToggle = one('.chat-toggle');
function closeChat() { chat.hidden = true; chatToggle.setAttribute('aria-expanded', 'false'); }
chatToggle.addEventListener('click', () => { chat.hidden = !chat.hidden; chatToggle.setAttribute('aria-expanded', String(!chat.hidden)); });
one('.chat-close').addEventListener('click', closeChat);
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeChat(); });
const catalogue = { 'Toy Car': 1200, 'Guitar': 1800, 'Teddy Bear': 900 };
let cart = storage.read('malik-cart-v2', {});
if (!cart || typeof cart !== 'object' || Array.isArray(cart)) cart = {};
cart = Object.fromEntries(Object.entries(cart).filter(([name, qty]) => name in catalogue && Number.isSafeInteger(qty) && qty > 0 && qty <= 99));
function renderCart() {
  const target = one('#cart-items'); if (!target) return;
  target.replaceChildren(); let quantity = 0, total = 0;
  for (const [name, qty] of Object.entries(cart)) {
    quantity += qty; total += catalogue[name] * qty;
    const row = document.createElement('div'); row.className = 'cart-row';
    const label = document.createElement('span'); label.textContent = name + ' × ' + qty;
    const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = '−'; remove.setAttribute('aria-label', 'Remove one ' + name);
    remove.addEventListener('click', () => { if (--cart[name] === 0) delete cart[name]; storage.write('malik-cart-v2', cart); renderCart(); });
    row.append(label, remove); target.append(row);
  }
  if (!quantity) { const empty = document.createElement('p'); empty.textContent = 'Cart is empty'; target.append(empty); }
  one('#cart-count').textContent = quantity; one('#cart-total').hidden = !quantity;
  one('#cart-total').textContent = 'Total: Rs ' + total.toLocaleString('en-PK') + ' · Demo cart';
  one('#clear-cart').hidden = !quantity;
}
all('.add-cart').forEach(button => button.addEventListener('click', () => { const name = button.dataset.product; cart[name] = Math.min(99, (cart[name] || 0) + 1); storage.write('malik-cart-v2', cart); renderCart(); }));
if (one('#clear-cart')) one('#clear-cart').addEventListener('click', () => { cart = {}; storage.write('malik-cart-v2', cart); renderCart(); });
renderCart();
