export const cart = [];

export function addToCart(productId) {
  
  // check if the product is already available in the cart
  let matchingItem;
  cart.forEach((cartItem) => {
    if(cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  // get the selected quantity
  const selectedQuantity = +document.querySelector(`.js-quantity-selector-${productId}`).value;

  if(matchingItem) {
    matchingItem.quantity += selectedQuantity;
  } else {
    cart.push({
      productId,
      quantity: selectedQuantity
    });
  }
}

