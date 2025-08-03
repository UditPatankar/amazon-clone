export const cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
  }
];

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

