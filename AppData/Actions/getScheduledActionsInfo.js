module.exports = {
  data: {
    name: "Get Scheduled Actions Info",
  },
  category: "Schedules",
  UI: [
    {
      element: "input",
      storeAs: "id",
      name: "Schedule ID",
    },
    "-",
    {
      element: "store",
      storeAs: "storeTimestampAs",
      name: "Store Timestamp As",
    },
    "_",
    {
      element: "store",
      storeAs: "storeAssociatedInfoAs",
      name: "Store Associated Info As"
    }
  ],
  subtitle: (values, constants) => {
    return `Schedule ID: ${values.id} - Store Timestamp As: ${constants.variable(values.storeTimestampAs)} - Store Associated Info As: ${constants.variable(values.storeAssociatedInfoAs)}`
  },

  run(values, message, client, bridge) {
    let schedules = client.IO.schedules.get();
    let schedule = schedules[bridge.transf(values.id)];
    bridge.store(values.storeTimestampAs, schedule.timestamp);
    bridge.store(values.storeAssociatedInfoAs, schedule.associatedInfo);
  },
};
