import { ProcessInput, ProcessOutput, ConsoleInputModule } from "./utils.js";

class Checkout {
  constructor() {
    this.inputModule = new ConsoleInputModule();
    this.processInput = new ProcessInput();
    this.processOutput = new ProcessOutput();
    this.hashMap = {};
  }

  async getUserInput() {
    return this.inputModule.getUserInput(
      "Please enter all the items purchased separated by a comma "
    );
  }

  async startCheckout() {
    const userInput = await this.getUserInput();
    this.hashMap = this.processInput.processUserInput(userInput);
    this.processOutput.calculateTotalPrice(this.hashMap);
  }
}

const checkout = new Checkout();
checkout.startCheckout();
