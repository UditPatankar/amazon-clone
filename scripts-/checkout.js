import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import { loadProducts } from "../data/products.js";
import {loadCart} from '../data/cart.js';
// import '../data/cart-oop.js';
// import '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backend-practice.js';

/* new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value);
  return new Promise((resolve) => {
      loadCart(() => {
        resolve();
    });
  });

}).then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}); */

Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('value1');
    });
  }),
  new Promise((resolve) => {
      loadCart(() => {
        resolve('value2');
    });
  })

]).then((values) => {
  console.log(values);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});


/* loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
}); */