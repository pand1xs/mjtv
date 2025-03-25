module.exports = {
  data: {
    name: "Limit Number",
  },
  category: "Numbers",
  UI: [
    {
      element: "input",
      storeAs: "number",
      name: "Number",
      placeholder: "Number"
    },
    "-",
    {
      element: "inputGroup",
      storeAs: ["min", "max"],
      nameSchemes: ["Minimum Value", "Maximum Value"],
      placeholder: ["Number", "Number"]
    },
    "-",
    {
      element: "store",
      storeAs: "store"
    }
  ],
  async run(values, message, client, bridge) {
    let number = BigInt(bridge.transf(values.number));
    let min = BigInt(bridge.transf(values.min));
    let max = BigInt(bridge.transf(values.max));
    if (number < min) number = min;
    if (number > max) number = max;
    bridge.store(values.store, number);
  },
};
