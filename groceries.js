export default (shoppingItemPrices, orderList) => {
  return orderList.reduce((acc, cur) => acc + cur[1] * getItemPrice(shoppingItemPrices, cur[0]), 0);
};

const getItemPrice = (shoppingItemPrices, item) => {
  return shoppingItemPrices.get(item);
};
