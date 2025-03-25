module.exports = {
  data: {
    name: "Get Audit Change Info",
  },
  category: "Audit Logs",
  UI: [
    {
      element: "var",
      storeAs: "audit",
      name: "Change",
    },
    "-",
    {
      element: "dropdown",
      storeAs: "get",
      name: "Get",
      choices: [
        {name: "Changed Item"},
        {name: "Old Value"},
        {name: "New Value"},
      ]
    },
    "-",
    {
      element: "store",
      storeAs: "store"
    },
  ],
  subtitle: (values, constants) => {
    return `${values.get} of ${constants.variable(values.audit)} - Store As: ${constants.variable(values.store)}`
  },
  compatibility: ["Any"],
  async run(values, message, client, bridge) {
    let change = bridge.get(values.audit);
    let output;

    switch (values.get) {
      case "Changed Item":
        output = change.key;
        break
      case "Old Value":
        output = change.oldValue;
        break
      case "New Value":
        output = change.newValue;
        break
    }

    bridge.store(values.store, output)
  },
};