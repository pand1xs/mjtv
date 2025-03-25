module.exports = {
  data: {
    name: "Get OAuth Instance",
  },
  category: "OAuth",
  UI: [
    {
      element: "input",
      name: "Access Token",
      storeAs: "access",
    },
    "-",
    {
      element: "store",
      storeAs: "store"
    }
  ],

  subtitle: "Generates a Discord OAuth URL",
  compatibility: ["Any"],
  run(values, message, client, bridge) {
    let token = bridge.transf(values.access);
    bridge.store(values.store, client.getOAuthHelper(token))
  },
};
