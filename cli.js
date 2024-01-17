export const cli = (items) => {
  console.log("Item\tQuantity\tPrice");
  console.log("--------------------------------------");
  items.forEach(({ item, quantity, price }) => {
    console.log(`${item}\t${quantity}\t\t$${price}`);
  });
};
