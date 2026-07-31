/* Shop listing: renders products from products-data.js and filters them. */
const catalogGrid = document.querySelector('#catalog-grid');

if (catalogGrid) {
  const filterLinks = document.querySelectorAll('[data-filter]');
  const filterStatus = document.querySelector('#filter-status');

  function productLink(product) { return `product.html?product=${product.id}`; }

  function createProductCard(product) {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.category = product.category;
    card.innerHTML = `
      <a class="product-image tall" href="${productLink(product)}" style="background-image: url('${product.image}')">
        ${product.label ? `<span>${product.label}</span>` : ''}
      </a>
      <div class="product-meta"><div><h3>${product.name}</h3><p>${product.subtitle}</p></div><b>${product.price}</b></div>
      <a class="quick-add" href="${productLink(product)}">View piece <span>↗</span></a>`;
    return card;
  }

  STORE_PRODUCTS.forEach((product) => catalogGrid.appendChild(createProductCard(product)));

  function applyFilter(requestedCategory) {
    const category = STORE_CATEGORIES[requestedCategory] ? requestedCategory : 'all';
    const cards = catalogGrid.querySelectorAll('.product-card');
    let visibleProducts = 0;
    cards.forEach((card) => {
      const visible = category === 'all' || card.dataset.category === category;
      card.hidden = !visible;
      if (visible) visibleProducts += 1;
    });
    filterLinks.forEach((link) => link.classList.toggle('active', link.dataset.filter === category));
    filterStatus.textContent = `${visibleProducts} ${visibleProducts === 1 ? 'piece' : 'pieces'} — ${STORE_CATEGORIES[category]}`;
    const url = new URL(window.location.href);
    category === 'all' ? url.searchParams.delete('category') : url.searchParams.set('category', category);
    window.history.replaceState({}, '', url);
  }

  applyFilter(new URLSearchParams(window.location.search).get('category') || 'all');
  filterLinks.forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    applyFilter(link.dataset.filter);
  }));
}
