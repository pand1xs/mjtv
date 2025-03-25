module.exports = {
  data: { name: "Delete Message Data", source: { type: "string", value: "" } },
  category: "Message Data",
  UI: [
    {
      element: "message",
      storeAs: "message",
    },
    "-",
    {
      element: "dropdown",
      storeAs: "deleteType",
      extraField: "delete",
      name: "Delete Type",
      choices: [
        { name: "All Data" },
        { name: "Specific Data", placeholder: "Data Name", field: true },
      ]
    },
  ],
  compatibility: ["Any"],
  subtitle: (values, constants) => {
    return `Message: ${constants.message(values.message)} - ${values.deleteType}`
  },
  async run(values, msg, client, bridge) {
    var storedData = bridge.data.IO.get();
    if (!storedData.messages) {
      storedData.messages = {};
    }

    let message = await bridge.getMessage(values.message);

    if (values.deleteType == 'All Data') {
      delete storedData.messages[message.id];
    } else {
      delete storedData.messages[message.id][bridge.transf(values.delete)];
    }

    bridge.data.IO.write(storedData);
  },
};