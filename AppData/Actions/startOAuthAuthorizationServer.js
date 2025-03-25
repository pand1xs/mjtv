module.exports = {
  data: {
    name: "Start OAuth Authorization Server",
  },
  category: "OAuth",
  UI: [
    {
      element: "input",
      storeAs: "port",
      name: "Port",
      placeholder: "8080"
    },
    "-",
    {
      element: "input",
      storeAs: "client_secret",
      name: "Client Secret",
    },
    "-",
    {
      element: "input",
      storeAs: "redirect_uri",
      name: "Redirect URI",
    },
    "-",
    {
      element: "menu",
      storeAs: "scenario_success",

    }
  ],
  run(values, message, client, bridge) {
  },
};
