module.exports = {
  data: {
    name: "Set Member Roles",
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
      element: "menu",
      name: "Roles",
      storeAs: "roles",
      types: {
        role: "Role"
      },
      max: 1000,
      UItypes: {
        role: {
          name: "Role",
          data: { role: { type: "id", value: "`${subtitleConstants.role(option.data.role)}`" } },
          UI: [
            {
              element: "role",
              name: "Role",
              storeAs: "role"
            }
          ]
        }
      }
    }
  ],
  async run(values, message, client, bridge) {
    let member = (await bridge.getUser(values.member)).member;
    let memberRoles = member.roles;
    let roles = [];
    
    values.roles.forEach(async roleMenu => {
      let role = await bridge.getRole(roleMenu.data.role);
      roles.push(role.id);
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
