document.addEventListener('DOMContentLoaded', () => {
  const cartProducts = document.querySelector('.cart__products');
  const productAddButtons = document.querySelectorAll('.product__add');

  // Загрузка корзины из localStorage
  function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    for (const productId in cart) {
      addProductToCart(productId, cart[productId]);
    }
  }

  // Сохранение корзины в localStorage
  function saveCart() {
    const cart = {};
    document.querySelectorAll('.cart__product').forEach(product => {
      const productId = product.getAttribute('data-id');
      const count = parseInt(product.querySelector('.cart__product-count').textContent);
      cart[productId] = count;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Добавление товара в корзину
  function addProductToCart(productId, count) {
    const productElement = document.querySelector(`.product[data-id="${productId}"]`);
    const productImage = productElement.querySelector('.product__image').src;
    let cartProduct = cartProducts.querySelector(`.cart__product[data-id="${productId}"]`);

    if (cartProduct) {
      const cartProductCount = cartProduct.querySelector('.cart__product-count');
      cartProductCount.textContent = parseInt(cartProductCount.textContent) + count;
    } else {
      cartProduct = document.createElement('div');
      cartProduct.className = 'cart__product';
      cartProduct.setAttribute('data-id', productId);
      cartProduct.innerHTML = `
        <img class="cart__product-image" src="${productImage}">
        <div class="cart__product-count">${count}</div>
      `;
      cartProducts.appendChild(cartProduct);
    }
    saveCart();
  }

  // Обработчики для кнопок увеличения/уменьшения количества
  document.querySelectorAll('.product__quantity-controls').forEach(controls => {
    const decButton = controls.querySelector('.product__quantity-control_dec');
    const incButton = controls.querySelector('.product__quantity-control_inc');
    const quantityValue = controls.querySelector('.product__quantity-value');

    decButton.addEventListener('click', () => {
      let value = parseInt(quantityValue.textContent);
      if (value > 1) {
        quantityValue.textContent = value - 1;
      }
    });

    incButton.addEventListener('click', () => {
      let value = parseInt(quantityValue.textContent);
      quantityValue.textContent = value + 1;
    });
  });

  // Обработчики для кнопок "Добавить в корзину"
  productAddButtons.forEach(button => {
    button.addEventListener('click', () => {
      const product = button.closest('.product');
      const productId = product.getAttribute('data-id');
      const quantityValue = product.querySelector('.product__quantity-value');
      const count = parseInt(quantityValue.textContent);
      addProductToCart(productId, count);
    });
  });

  // Загрузка корзины при старте
  loadCart();
});
