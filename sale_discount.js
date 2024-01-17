import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const priceTable = {
  milk: { unit: 3.97, saleQuantity: 2, salePrice: 5 },
  bread: { unit: 2.17, saleQuantity: 3, salePrice: 6 },
  banana: { unit: 0.99, saleQuantity: 0, salePrice: 0 },
  apple: { unit: 0.89, saleQuantity: 0, salePrice: 0 },
};

const hashMap = {};

rl.question(
  "Please enter all the items purchased separated by a comma ",
  (input) => {
    rl.close();
    input.split(",").map((value) => {
      hashMap[value.trim()] = hashMap[value.trim()] || 0;
      hashMap[value.trim()] += 1;
    });
  }
);
