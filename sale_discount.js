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
    let totalPrice = 0;
    let totNoDiscPrice = 0;
    Object.entries(hashMap).forEach(([key, value]) => {
      let totalQuantity = 0;
      let remQuantity = 0;
      totNoDiscPrice += value * priceTable[key]["unit"];
      if (priceTable[key]["saleQuantity"]) {
        totalQuantity = Math.floor(value / priceTable[key]["saleQuantity"]);
        remQuantity = value % priceTable[key]["saleQuantity"];
      } else {
        remQuantity = value;
      }
      let discountPrice = totalQuantity * priceTable[key]["salePrice"];
      let unitPrice = remQuantity * priceTable[key]["unit"];
      const finalItemPrice = discountPrice + unitPrice;
      totalPrice += finalItemPrice;
      console.log({ key, total: discountPrice + unitPrice });
      displayItems.push({ item: key, quantity: value, price: finalItemPrice });
    });

    console.log(`Total price : $${totalPrice.toFixed(2)}`);
    console.log(
      `You saved $${(totNoDiscPrice - totalPrice).toFixed(2)} today.`
    );
  }
);
