module.exports = {
  data: { name: "Store Message Data", source: { type: "string", value: "" } },
  category: "Message Data",
  UI: [
    {
      element: "message",
      storeAs: "message",
    },
    "-",
    {
      element: "input",
      storeAs: "dataName",
      name: "Data Name",
      placeholder: "Key",
    },
    "_",
    {
      element: "var",
      storeAs: "source",
      name: "New Value",
      also: {
        string: "Text",
      },
    },
  ],
  compatibility: ["Any"],
  subtitle: (values, constants) => {
    let newValue = values.source;
    if (newValue.type == 'string') {
      newValue = newValue.value;
    } else {
      newValue = constants.variable(newValue);
    }
    return `Message: ${constants.message(values.message)} - Data Name: ${values.dataName} - New Value: ${newValue}`
  },
  async run(values, msg, client, bridge) {
    var storedData = bridge.data.IO.get();

    let message = await bridge.getMessage(values.message);

    if (!storedData.messages) {
      storedData.messages = {};
    }

    let dataOverwrite;

    if (!values.source) {
      dataOverwrite = bridge.transf(values.dataValue);
    } else {
      if (values.source.type == "string") {
        dataOverwrite = bridge.transf(values.source.value);
      } else {
        dataOverwrite = bridge.get(values.source);
      }
    }

    if (!storedData.messages[message.id]) {
      storedData.messages[message.id] = {};
    }

    storedData.messages[message.id][bridge.transf(values.dataName)] = dataOverwrite;
    bridge.data.IO.write(storedData);
  },
};
