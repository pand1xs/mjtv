module.exports = {
  data: { name: "Get Text Word Count" },
  category: "Text",
  UI: [
    {
      element: "largeInput",
      name: "Text",
      storeAs: "text",
    },
    "-",
    {
      element: "store",
      name: "Store Word Count As",
      storeAs: "store",
    },
  ],

  subtitle: (values, constants) => {
    return `Get Count of ${values.text} - Store As ${constants.variable(values.store)}`
  },

  async run(values, message, client, bridge) {
    bridge.store(values.store, bridge.transf(values.text).split(" ").length);
  },
};
