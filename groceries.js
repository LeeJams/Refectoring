export default (shoppingItemPrices, orderList) => {
  let totalOrderPrice = 0;
  for (const item of orderList) {
    totalOrderPrice += getItemPrice(shoppingItemPrices, item[0]) * item[1];
  }

  return totalOrderPrice;
};

const getItemPrice = (shoppingItemPrices, item) => {
  return shoppingItemPrices.get(item);
};
