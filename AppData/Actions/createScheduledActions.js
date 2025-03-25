module.exports = {
  data: {
    name: "Create Scheduled Actions",
  },
  category: "Schedules",
  UI: [
    {
      element: "typedDropdown",
      storeAs: "time",
      name: "Run",
      choices: {
        timestamp: { name: "At Timestamp", field: true },
        seconds: { name: "In # Seconds", field: true },
        minutes: { name: "In # Minutes", field: true },
        hours: { name: "In # Hours", field: true },
        days: { name: "In # Days", field: true },
        weeks: { name: "In # Weeks", field: true },
        months: { name: "In # Months", field: true },
      }
    },
    "_",
    {
      element: "variable",
      name: "Associated Information",
      optional: true,
      storeAs: "associatedInfo",
      additionalOptions: {
        text: { name: "Text", field: true }
      }
    },
    "-",
    {
      element: "menu",
      max: 1,
      required: true,
      storeAs: "scheduled",
      types: {
        scheduleActions: "Schedule Actions"
      },
      UItypes: {
        scheduleActions: {
          name: "Scheduled Actions",
          inheritData: true,
          UI: [
            {
              element: "store",
              name: "When The Job Runs, Store Associated Information As",
              storeAs: "store",
              optional: true,
              help: {
                name: "Associated Information",
                UI: [
                  {
                    element: "text",
                    header: true,
                    text: "Why is this an option?"
                  },
                  {
                    element: "text",
                    text: `
                    This is an option because the scheduled actions work similar to persistent components. They work across restarts but they cannot access variables created outside of them. You can assign some information via the "Associated Information" option outside of this menu, in the action. It will allow you to use that information you stored when the scheduled actions run.
                    `
                  }
                ]
              }
            },
            "-",
            {
              element: "actions",
              name: "Scheduled Actions",
              storeAs: "actions"
            },
          ]
        }
      }
    },
    "-",
    {
      element: "store",
      name: "Store ID As",
      storeAs: "storeID"
    },
  ],
  subtitle: (values, constants) => {
    return `${values.actions.length} Actions - Store ID As ${constants.variable(values.storeID)}`
  },
  startup: (bridge) => {
    if (!bridge.fs.existsSync('./schedules')) {
      bridge.fs.writeFileSync('./schedules', "{}")
    }

    let getData = () => {
      return JSON.parse(bridge.fs.readFileSync('./schedules', 'utf8'));
    }
    let writeData = (data) => {
      bridge.fs.writeFileSync('./schedules', JSON.stringify(data));
    }

    bridge.data.IO.schedules = {
      get: getData,
      write: writeData
    }
  },
  init: (values, bridge) => {
    setInterval(async () => {
      let data = bridge.data.IO.schedules.get();
      let currentTime = Date.now();
      for (let time in data) {
        if (data[time].time < currentTime && data[time].id == bridge.data.id) {
          bridge.store(bridge.actions[bridge.atAction].data.store, data[time].associatedInfo);
          await bridge.runActions(bridge.actions[bridge.atAction].data.actions);
          delete data[time];
          bridge.data.IO.schedules.write(data);
        }
      }
    }, 5000)
  },
  run(values, message, client, bridge) {
    let time;

    let timeUnits = {
      seconds: 1000,
      minutes: 1000 * 60,
      hours: 1000 * 60 * 60,
      days: 1000 * 60 * 60 * 24,
      weeks: 1000 * 60 * 60 * 24 * 7,
      months: 1000 * 60 * 60 * 24 * 30,
    };

    if (timeUnits[values.time]) {
      time = Date.now() + timeUnits[values.time] * bridge.transf(values.time.value);
    } else {
      time = bridge.transf(values.time.value);
    }

    let data = bridge.data.IO.schedules.get();
    let assignedID = `${time}#${bridge.data.id}`;

    data[assignedID] = {
      id: bridge.data.id,
      associatedInfo: values.associatedInfo.type == 'text' ? bridge.transf(values.associatedInfo.value) : bridge.get(values.associatedInfo),
      time
    }

    bridge.data.IO.schedules.write(data);
    bridge.store(values.storeID, assignedID);
  },
};
