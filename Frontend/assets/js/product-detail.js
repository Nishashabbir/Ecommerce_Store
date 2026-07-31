/* Product detail page: reads the selected product from products-data.js. */
const requestedProductId = new URLSearchParams(window.location.search).get('product');
const selectedProduct = STORE_PRODUCTS.find((product) => product.id === requestedProductId) || STORE_PRODUCTS[0];

document.title = `${selectedProduct.name} — loop`;
document.querySelector('#detail-collection').textContent = STORE_CATEGORIES[selectedProduct.category];
document.querySelector('#detail-name').textContent = selectedProduct.name;
document.querySelector('#detail-price').textContent = selectedProduct.price;
document.querySelector('#detail-description').textContent = selectedProduct.description;
document.querySelector('#detail-care').textContent = selectedProduct.care;
document.querySelector('#detail-image').src = selectedProduct.image;
document.querySelector('#detail-image').alt = selectedProduct.name;
