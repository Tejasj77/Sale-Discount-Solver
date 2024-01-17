import readline from "readline";

class Checkout {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.priceTable = {
      milk: { unit: 3.97, saleQuantity: 2, salePrice: 5 },
      bread: { unit: 2.17, saleQuantity: 3, salePrice: 6 },
      banana: { unit: 0.99, saleQuantity: 0, salePrice: 0 },
      apple: { unit: 0.89, saleQuantity: 0, salePrice: 0 },
    };
    this.hashMap = {};
    this.displayItems = [];
  }

  async getUserInput() {
    return new Promise((resolve) => {
      this.rl.question(
        "Please enter all the items purchased separated by a comma ",
        (input) => {
          resolve(input);
        }
      );
    });
  }

  calculateTotalPrice() {
    let totalPrice = 0;
    let totNoDiscPrice = 0;

    Object.entries(this.hashMap).forEach(([key, value]) => {
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

    this.displayCheckout();
    console.log(`Total price: $${totalPrice.toFixed(2)}`);
    console.log(
      `You saved $${(totNoDiscPrice - totalPrice).toFixed(2)} today.`
    );

    this.rl.close();
  }

  displayCheckout() {
    console.log("Item\tQuantity\tPrice");
    console.log("--------------------------------------");
    this.displayItems.forEach(({ item, quantity, price }) => {
      console.log(
        `${
          item.charAt(0).toUpperCase() + item.slice(1)
        }\t${quantity}\t\t$${price.toFixed(2)}`
      );
    });
  }

  async startCheckout() {
    const userInput = await this.getUserInput();
    this.processUserInput(userInput);
    this.calculateTotalPrice();
  }

  processUserInput(input) {
    input.split(",").map((value) => {
      this.hashMap[value.trim()] = this.hashMap[value.trim()] || 0;
      this.hashMap[value.trim()] += 1;
    });
  }
}

const checkout = new Checkout();
checkout.startCheckout();
