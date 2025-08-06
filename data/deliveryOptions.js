import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [
  {
    id: '1',
    deliveryDay: '7',
    priceCents: 0
  },
  {
    id: '2',
    deliveryDay: '3',
    priceCents: 499
  },
  {
    id: '3',
    deliveryDay: '1',
    priceCents: 999
  }
];

export function getDeliveryOption(deliverOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if(option.id === deliverOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption;
}

export function calculateDeliveryDate(deliveryOption) {
    const todayDate = dayjs();
    let deliveryDate = todayDate.add(deliveryOption.deliveryDay, 'days');
    
    while(deliveryDate.day() === 0 || deliveryDate.day() === 6) {
      deliveryDate = deliveryDate.add(1, 'day');
    }

    return deliveryDate.format('dddd, MMMM D');;
}