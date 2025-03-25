module.exports = {
  data: {
    name: "Set Member Roles Via List",
  },
  category: "Members",
  UI: [
    {
      element: "member",
      storeAs: "member"
    },
    "-",
    {
      element: "typedDropdown",
      storeAs: "type",
      name: "Type",
      choices: {
        overwrite: { name: "Overwrite" },
        add: { name: "Add" },
        remove: { name: "Remove" }
      }
    },
    "_",
    {
      element: "variable",
      storeAs: "roles",
      name: "Roles",
    }
  ],
  async run(values, message, client, bridge) {
    let member = (await bridge.getUser(values.member)).member;
    let memberRoles = member.roles;
    let roles = [];
    
    bridge.get(values.roles).forEach(async role => {
      if (typeof role == "object") {
        role = role.id;
      }

      roles.push(role);
    });

    if (values.type.type == "overwrite") {
      memberRoles = roles;
    } else if (values.type.type == "add") {
      memberRoles = memberRoles.concat(roles);
    } else if (values.type.type == "remove") {
      memberRoles = memberRoles.filter(role => !roles.includes(role));
    }

    await member.edit({
      roles: memberRoles
    })
  },
};
