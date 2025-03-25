module.exports = {
  category: "Roles",
  data: {
    name: "Remove Role",
  },
  aliases: ["Take Role Away", "Unadd Role"],
  UI: [
    {
      element: "memberInput",
      storeAs: "member",
      name: "Remove From Member"
    },
    "-",
    {
      element: "role",
      storeAs: "role",
      name: "Role",
    },
    "-",
    {
      element: "input",
      max: "256",
      placeholder: "Optional",
      name: "Reason"
    }
  ],

  compatibility: ["Any"],
  
  subtitle: (values, constants) => {
    return `Remove ${constants.role(values.role)} from ${constants.user(values.member)}`
  },

  async run(values, message, client, bridge) {
    let role = await bridge.getRole(values.role);

    let member = (await bridge.getUser(values.member)).member;
    await member.removeRole(role.id, bridge.transf(values.reason));
  },
};