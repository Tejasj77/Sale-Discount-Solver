import readline from "readline";

export class ConsoleInputModule {
  async getUserInput(prompt) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question(prompt, (input) => {
        resolve(input);
        rl.close();
      });
    });
  }
}

export class ConsoleOutputModule {
  displayCheckoutHeader() {
    console.log("Item\tQuantity\tPrice");
    console.log("--------------------------------------");
  }

  displayCheckoutItem(item, quantity, price) {
    console.log(
      `${
        item.charAt(0).toUpperCase() + item.slice(1)
      }\t${quantity}\t\t$${price.toFixed(2)}`
    );
  }

  displayTotalPrice(totalPrice, totNoDiscPrice, displayItems) {
    this.displayCheckoutHeader();
    displayItems.forEach(({ item, quantity, price }) => {
      this.displayCheckoutItem(item, quantity, price);
    });
    console.log(`Total price: $${totalPrice.toFixed(2)}`);
    console.log(
      `You saved $${(totNoDiscPrice - totalPrice).toFixed(2)} today.`
    );
  }
}

export class ProcessInput {
  hashMap = {};
  processUserInput(input) {
    input.split(",").map((value) => {
      this.hashMap[value.trim()] = this.hashMap[value.trim()] || 0;
      this.hashMap[value.trim()] += 1;
    });
    return this.hashMap;
  }
}

export class ProcessOutput {
  constructor() {
    this.outputModule = new ConsoleOutputModule();
    this.priceTable = {
      milk: { unit: 3.97, saleQuantity: 2, salePrice: 5 },
      bread: { unit: 2.17, saleQuantity: 3, salePrice: 6 },
      banana: { unit: 0.99, saleQuantity: 0, salePrice: 0 },
      apple: { unit: 0.89, saleQuantity: 0, salePrice: 0 },
    };
    this.displayItems = [];
  }

  calculateTotalPrice(hashMap) {
    let totalPrice = 0;
    let totNoDiscPrice = 0;

    Object.entries(hashMap).forEach(([key, value]) => {
      let totalQuantity = 0;
      let remQuantity = 0;
      totNoDiscPrice += value * this.priceTable[key].unit;

      if (this.priceTable[key].saleQuantity) {
        totalQuantity = Math.floor(value / this.priceTable[key].saleQuantity);
        remQuantity = value % this.priceTable[key].saleQuantity;
      } else {
        remQuantity = value;
      }

      let discountPrice = totalQuantity * this.priceTable[key].salePrice;
      let unitPrice = remQuantity * this.priceTable[key].unit;
      const finalItemPrice = discountPrice + unitPrice;
      totalPrice += finalItemPrice;

      this.displayItems.push({
        item: key,
        quantity: value,
        price: finalItemPrice,
      });
    });
    this.outputModule.displayTotalPrice(
      totalPrice,
      totNoDiscPrice,
      this.displayItems
    );
  }
}
