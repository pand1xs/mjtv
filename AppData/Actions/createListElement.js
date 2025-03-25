module.exports = {
  category: "Lists",
  data: { name: "Create List Element" },
  aliases: ["Add Element To List", "Create List Entry", "List Add", "Add To List", "Add Entry To List", "Push To List", "Push Element To List", "Push Entry To List", "New List Item", "Expand List", "Introduce List Item", "Introduce List Element"],
  UI: [
    {
      element: "variableInsertion",
      storeAs: "list",
      name: "List",
    },
    "_",
    {
      element: "var",
      storeAs: "value",
      name: "Element Value",
      also: {
        string: "Text",
      },
    },
  ],

  subtitle: (data, constants) => {
    if (data.value.type == 'string') {
      return `List: ${constants.variable(data.list)} - Create: ${data.value.value}`
    } else {
      return `List: ${constants.variable(data.list)} - Create: ${constants.variable(data.value)}`
    }
  },
  compatibility: ["Any"],

  run(values, message, client, bridge) {
    let list = bridge.get(values.list);

    let dataOverwrite;
    if (typeof values.value == "string") {
      dataOverwrite = bridge.transf(values.value);
    } else {
      if (values.value.type == "string") {
        dataOverwrite = bridge.transf(values.value.value);
      } else {
        dataOverwrite = bridge.get(values.value);
      }
    }

    list.push(dataOverwrite);
  },
};
