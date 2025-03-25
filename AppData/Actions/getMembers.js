module.exports = {
  data: { name: "Get Server Members" },
  category: "Servers",
  UI: [
    {
      element: "input",
      storeAs: "limit",
      name: "Limit",
      placeholder: "Optional • Number (Default: 50)"
    },
    "-",
    {
      element: "store",
      storeAs: "store"
    }
  ],

  compatibility: ["Any"],
  subtitle: (values, constants) => {
    return `Store As ${constants.variable(values.store)}`
  },

  async run(values, message, client, bridge) {
    let members = await require('./getGuildInfo.js').getMembers(bridge, undefined, Number(bridge.transf(values.limit)) || 50)

    bridge.store(values.store, members)
  },
};
