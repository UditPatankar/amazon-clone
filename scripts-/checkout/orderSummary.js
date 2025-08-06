import {products, getProduct} from '../../data/products.js'
import {cart, removeFromCart,calculateCartQuantity, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    
    const productId = cartItem.productId;
    let matchingProduct = getProduct(productId);

    const deliverOptionId = cartItem.deliveryOptionId;
    let deliveryOption = getDeliveryOption(deliverOptionId);

    const todayDate = dayjs();
    const deliveryDate = todayDate.add(deliveryOption.deliveryDay, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link js-update-quantity-link link-primary"
                      data-product-id="${matchingProduct.id}">
                      Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-link js-save-quantity-link link-primary"
                      data-product-id="${matchingProduct.id}">
                      Save
                    </span>
                    <span class="delete-quantity-link js-delete-quantity-link link-primary"
                      data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(cartItem, matchingProduct.id)}
                </div>
              </div>
            </div>
    `;
  });

  function deliveryOptionsHTML(cartItem, matchingProductId) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      
      const todayDate = dayjs();
      const deliveryDate = todayDate.add(deliveryOption.deliveryDay, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      const priceString = deliveryOption.priceCents 
        === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId

      html += `
              <div class="delivery-option js-delivery-option"
                data-product-id="${matchingProductId}" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" ${isChecked ? 'checked' : ''}
                  class="delivery-option-input"
                  name="delivery-option-${matchingProductId}">
                <div>
                  <div class="delivery-option-date">
                    ${dateString}
                  </div>
                  <div class="delivery-option-price">
                    ${priceString} - Shipping
                  </div>
                </div>
              </div>
              `;
    });

    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
  document.querySelectorAll('.js-delete-quantity-link').forEach((deleteLink) => {
    deleteLink.addEventListener("click", () => {
      const productId = deleteLink.dataset.productId;
      removeFromCart(productId); 
      
      renderOrderSummary();

      updateCartQuantity();
      renderPaymentSummary();
    });
  });

  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-checkout-header-middle-section').innerText = `${cartQuantity} items`;
  }

  updateCartQuantity();

  document.querySelectorAll('.js-update-quantity-link').forEach((updateLink) => {
    updateLink.addEventListener("click", () => {
      const productId = updateLink.dataset.productId;
      
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    });
  });

  document.querySelectorAll('.js-save-quantity-link').forEach((saveLink) => {
    saveLink.addEventListener("click", () => {
      const productId = saveLink.dataset.productId;
      
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');

      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      
      let newQuantity;
      if(quantityInput.value <= 0) {
        newQuantity = 1;
      } else {
        newQuantity = +quantityInput.value;
      }

      updateQuantity(productId, newQuantity); 
      
      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
      quantityLabel.innerHTML = newQuantity;

      updateCartQuantity();
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((optionElement) => {
    optionElement.addEventListener("click", () => {
      const {productId, deliveryOptionId} = optionElement.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

}