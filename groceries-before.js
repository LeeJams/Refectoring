export default () => {
  var things = ["apple", "kimchi", "chicken", "fanta", "cheese"];

  var ps = [
    ["apple", 10.5],
    ["kimchi", 22.5],
    ["chicken", 61.0],
    ["banana", 13.3],
    ["cheese", 25.0],
  ];

  var micheal_kim_order_items_array = [
    ["apple", 3],
    ["kimchi", 10],
    ["banana", 5],
    ["cheese", 2],
  ];

  var jinny_park_order_items_array = [
    ["chicken", 3],
    ["cheese", 10],
  ];

  let micheal_price = 0;
  for (var x of micheal_kim_order_items_array) {
    for (var y of ps) {
      if (x[0] === y[0]) {
        micheal_price += x[1] * y[1];
      }
    }
  }

  let jinny_price = 0;
  for (var x of jinny_park_order_items_array) {
    for (var y of ps) {
      if (x[0] === y[0]) {
        jinny_price += x[1] * y[1];
      }
    }
  }

  return {
    micheal: micheal_price,
    jinny: jinny_price,
  };
};
