import groceries from "./groceries.js";

const shoppingItemPrices = [
  ["apple", 10.5],
  ["kimchi", 22.5],
  ["chicken", 61.0],
  ["banana", 13.3],
  ["cheese", 25.0],
];

test("Grocery cost is calculated correctly", () => {
  const michealPrice = groceries(shoppingItemPrices, [
    ["apple", 3],
    ["kimchi", 10],
    ["banana", 5],
    ["cheese", 2],
  ]);
  expect(michealPrice).toBe(373);
});
