module.exports = {
  category: "Roles",
  data: {
    name: "Add Role",
  },
  aliases: ["Give Role", "Give Role To Member", "Give Member Role"],
  UI: [
    {
      element: "memberInput",
      storeAs: "member",
      name: "Add To Member"
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
      name: "Reason",
      storeAs: "reason"
    }
  ],

  compatibility: ["Any"],
  subtitle: (values, constants) => {
    return `Add ${constants.role(values.role)} to ${constants.user(values.member)}`
  },

  async run(values, message, client, bridge) {
    let role = await bridge.getRole(values.role);

    let member = (await bridge.getUser(values.member)).member;
    await member.addRole(role.id, bridge.transf(values.reason));
  },
};
