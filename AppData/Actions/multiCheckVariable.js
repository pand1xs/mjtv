module.exports = {
  category: "Variables",
  aliases: ["If Then", "Compare", "Else If"],
  data: {
    name: "Multi Check Variable",
  },
  UI: [
    {
      element: "var",
      storeAs: "variable"
    },
    "-",
    {
      element: "menu",
      storeAs: "cases",
      name: "Comparisons",
      types: {
        comparison: "Comparison"
      },
      max: 200,
      UItypes: {
        comparison: {
          data: {},
          name: "Comparison",
          preview: "`${option.data.comparator} ${option.data.compareValue}`",
          UI: [
            {
              element: "dropdown",
              storeAs: "comparator",
              name: "Comparator",
              choices: [
                {
                  name: "Equals",
                  field: true,
                  placeholder: "Equals To",
                },
                {
                  name: "Equals Exactly",
                  field: true,
                },
                {
                  name: "Doesn't Equal",
                  field: true,
                },
                {
                  name: "Exists"
                },
                {
                  name: "Less Than",
                  field: true
                },
                {
                  name: "Greater Than",
                  field: true
                },
                {
                  name: "Equal Or Less Than",
                  field: true
                },
                {
                  name: "Equal Or Greater Than",
                  field: true
                },
                {
                  name: "Is Number"
                },
                {
                  name: "Matches Regex",
                  field: true,
                  placeholder: "Regex"
                }
              ]
            },
          ]
        }
      }
    },
    "-",
    {
      element: "condition",
      storeAs: "true",
      storeActionsAs: "trueActions",
      name: "If True"
    },
    "-",
    {
      element: "condition",
      storeAs: "false",
      storeActionsAs: "falseActions",
      name: "If False"
    }
  ],

  subtitle: (data, constants) => {
    let variable = constants.variable(data.variable);
    return `Check ${variable} Against ${data.cases.length} Cases`;
  },

  async run(values, message, client, bridge) {
    let variable = bridge.get(values.variable);
    let matchesCriteria = false;

    for (let c in values.cases) {
      let comparison = values.cases[c].data;
      let secondValue = bridge.transf(comparison.comparator.value);

      switch (comparison.comparator) {
        case "Equals":
          if (`${variable}` == `${secondValue}`) {
            matchesCriteria = true;
          }
          break;
        case "Equals Exactly":
          if (variable === secondValue) {
            matchesCriteria = true;
          }
          break;
        case "Doesn't Equal":
          if (variable != secondValue) {
            matchesCriteria = true;
          }
          break;
        case "Exists":
          matchesCriteria = variable != null && variable != undefined;
          break;
        case "Less Than":
          if (Number(variable) < Number(secondValue)) {
            matchesCriteria = true;
          }
          break;
        case "Greater Than":
          if (Number(variable) > Number(secondValue)) {
            matchesCriteria = true;
          }
          break;
        case "Equal Or Less Than":
          if (Number(variable) <= Number(secondValue)) {
            matchesCriteria = true;
          }
          break;
        case "Equal Or Greater Than":
          if (Number(variable) >= Number(secondValue)) {
            matchesCriteria = true;
          }
          break;
        case "Is Number":
          if (typeof parseInt(variable) == 'number' && !isNaN(parseInt(variable))) {
            matchesCriteria = true;
          }
          break;
        case "Matches Regex":
          matchesCriteria = Boolean(variable.match(new RegExp("^" + secondValue + "$", "i")));
          break;
      }

      if (matchesCriteria) {
        await bridge.call(values.true, values.trueActions);
        return;
      }
    }

    await bridge.call(values.false, values.falseActions);
  },
};
