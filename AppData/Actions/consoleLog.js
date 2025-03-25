module.exports = {
  data: {
    name: "Log To Console",
  },
  category: "Control",
  UI: [
    {
      element: "largeInput",
      name: "What To Log",
      storeAs: "comment"
    }
  ],
  subtitle: "$[comment]$",
  compatibility: ["Any"],
  run(values, message, client, bridge) {
    console.log(bridge.transf(values.comment))
  },
};
