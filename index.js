import groceries from "./groceries.js";

const shoppingItemPrices = new Map([
  ["apple", 10.5],
  ["kimchi", 22.5],
  ["chicken", 61.0],
  ["banana", 13.3],
  ["cheese", 25.0],
]);

const michealPrice = groceries(shoppingItemPrices, [
  ["apple", 3],
  ["kimchi", 10],
  ["banana", 5],
  ["cheese", 2],
]);

const jinnyPrice = groceries(shoppingItemPrices, [
  ["chicken", 3],
  ["cheese", 10],
]);
console.log(shoppingItemPrices)
console.log("Micheal`s price: ", michealPrice);
console.log("Jinny`s price: ", jinnyPrice);
