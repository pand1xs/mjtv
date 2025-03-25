module.exports = {
  data: {
    name: "Get Generic Audit Log Info",
  },
  category: "Audit Logs",
  UI: [
    {
      element: "var",
      storeAs: "audit",
      name: "Audit Log",
    },
    "-",
    {
      element: "dropdown",
      storeAs: "get",
      name: "Get",
      choices: [
        { name: "Target ID" },
        { name: "Executor" },
        { name: "Reason" },
        { name: "Changes" },
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
    let auditLog = bridge.get(values.audit);
    let output;

    switch (values.get) {
      case "Target ID":
        output = auditLog.targetID;
        break
      case "Executor":
        output = client.users.get(auditLog.userID) || (await client.rest.users.get(auditLog.userID))
        break
      case "Reason":
        output = auditLog.reason;
        break
      case "Changes":
        output = auditLog.changes;
        break
    }

    bridge.store(values.store, output)
  },
};