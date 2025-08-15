export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if(order.id === orderId) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
}

console.log(getOrder('5103d5ea-199b-4810-8d4a-c1aa5f605269'));