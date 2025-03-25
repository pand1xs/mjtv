module.exports = {
  data: { name: "Set User Restriction" },
  category: "Control",
  aliases: ["limit command to user", "lock down command to certain people", "make accessible to specific people", "limit to users", "limit to members"],
  UI: [
    {
      element: "user",
      storeAs: "user",
    },
    "-",
    {
      element: "menu",
      storeAs: "users",
      name: "Restricted Users",
      max: 1000,
      types: {
        user: "User"
      },
      UItypes: {
        user: "User",
        data: { user: { type: "id", value: "" } },
        UI: [
          {
            element: "user",
            storeAs: "user",
          }
        ]
      }
    },
    "-",
    {
      element: "case",
      name: "If The User Is Restricted",
      storeAs: "ifRestricted",
      storeActionsAs: "ifRestrictedActions"
    },
    "-",
    {
      element: "case",
      name: "If The User Isn't Restricted",
      storeAs: "ifNotRestricted",
      storeActionsAs: "ifNotRestrictedActions"
    }
  ],

  subtitle: (values, constants) => {
    return `Check If ${constants.user(values.user)} Is Restricted`;
  },
  async run(values, message, client, bridge) {
    let user = await bridge.getUser(values.user);

    let users = [];
    values.users.forEach(async userMenu => {
      let user = await bridge.getUser(userMenu.data.user);
      users.push(user.id);
    });

    if (users.includes(user.id)) {
      await bridge.call(values.ifRestricted, values.ifRestrictedActions)
    } else {
      await bridge.call(values.ifNotRestricted, values.ifNotRestrictedActions)
    }
  },
};
