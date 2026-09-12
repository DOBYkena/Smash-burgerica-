const menuItems = [
  { category: 'burger', label: 'Bestseller', name: 'Classic Smash', description: '2x smashed govedina, cheddar, kiseli krastavci, luk i house sos.', price: '12 KM', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=85' },
  { category: 'burger', label: 'Spicy', name: 'Hot Smash', description: 'Smashed govedina, pepper jack, jalapeno, crispy onion i hot sos.', price: '14 KM', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=85' },
  { category: 'burger', label: 'Classic', name: 'Cheese Smash', description: 'Double beef, dupli cheddar, karamelizovani luk i smash sos.', price: '13 KM', image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=700&q=85' },
  { category: 'hotdog', label: 'Novo', name: 'Loaded Dog', description: 'Bečka kobasica, cheddar, prženi luk, senf i ketchup.', price: '10 KM', image: 'https://images.unsplash.com/photo-1612392062631-94dd858cba88?auto=format&fit=crop&w=700&q=85' },
  { category: 'hotdog', label: 'Tost', name: 'Chicken Tost', description: 'Pileća prsa, sir, salata i secret sos u hrskavom tostu.', price: '10 KM', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=85' },
  { category: 'side', label: 'Must have', name: 'Smash Fries', description: 'Hrskavi pomfrit sa house začinom. Puca pod zubima.', price: '4 KM', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=85' },
  { category: 'side', label: 'Extra', name: 'Loaded Fries', description: 'Pomfrit, cheddar sos, crispy onion i jalapeno.', price: '7 KM', image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=700&q=85' },
  { category: 'drink', label: 'Cold', name: 'Lemonade', description: 'Domaća limunada sa svježom mentom i ledom.', price: '4 KM', image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?auto=format&fit=crop&w=700&q=85' }
];

const menuGrid = document.querySelector('#menu-grid');
const renderMenu = (category = 'all') => {
  const filtered = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);
  menuGrid.innerHTML = filtered.map(item => `<article class="menu-card"><div class="menu-card-image"><img src="${item.image}" alt="${item.name}" loading="lazy"><span class="menu-card-label">${item.label}</span></div><div class="menu-card-content"><div class="menu-card-title"><span>${item.name}</span><span class="menu-card-price">${item.price}</span></div><p class="menu-card-description">${item.description}</p></div></article>`).join('');
};
renderMenu();

document.querySelectorAll('.tab-button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.tab-button').forEach(tab => { tab.classList.remove('active'); tab.setAttribute('aria-selected', 'false'); });
  button.classList.add('active');
  button.setAttribute('aria-selected', 'true');
  renderMenu(button.dataset.category);
}));

const reviews = [
  ['Burgerica smash u centru grada, sve preporuke. Meso je sočno, lepinja mekana, a pomfrit savršen.', 'Google gost'],
  ['Odličan burger, super usluga i baš dobra atmosfera. Definitivno se vraćamo po još jedan smash.', 'Lokalni gost'],
  ['Jedan od najboljih burgera u Tuzli. Sve svježe, brzo i ukusno. Hot Smash je za svaku preporuku.', 'Google gost']
];
let reviewIndex = 0;
const reviewText = document.querySelector('#review-text');
const reviewAuthor = document.querySelector('#review-author');
const reviewCounter = document.querySelector('#review-index');
const updateReview = (direction) => {
  reviewIndex = (reviewIndex + direction + reviews.length) % reviews.length;
  reviewText.style.opacity = 0;
  setTimeout(() => { reviewText.textContent = reviews[reviewIndex][0]; reviewAuthor.textContent = reviews[reviewIndex][1]; reviewCounter.textContent = `0${reviewIndex + 1} / 0${reviews.length}`; reviewText.style.opacity = 1; }, 160);
};
document.querySelector('#review-prev').addEventListener('click', () => updateReview(-1));
document.querySelector('#review-next').addEventListener('click', () => updateReview(1));

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => { const open = menuToggle.classList.toggle('open'); nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', open); });
document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => { menuToggle.classList.remove('open'); nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', false); }));

const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
document.querySelectorAll('.gallery-card').forEach(card => card.addEventListener('click', () => { lightboxImage.src = card.dataset.image; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); }));
const closeLightbox = () => { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); lightboxImage.src = ''; };
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });
