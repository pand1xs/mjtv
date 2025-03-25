module.exports = {
  data: { name: "Set Bot Activity" },
  category: "Bot",
  aliases: ["Set Custom Status", "Set Playing Game", "Set Game Playing", "Set Watching Movie", "Set Movie Watching", "Set Listening To Song", "Set Song Listening To", "Set Streaming Status", "Set Competing Status", "Edit Status", "Do Not Disturb", "Idle", "Invisible"],
  UI: [
    {
      element: "dropdown",
      storeAs: "status",
      name: "Status",
      choices: [
        {
          name: "Online"
        },
        {
          name: "Do Not Disturb"
        },
        {
          name: "Idle"
        },
        {
          name: "Invisible"
        }
      ]
    },
    "-",
    {
      element: "dropdown",
      name: "Activity",
      extraField: "activityName",
      storeAs: "activity",
      choices: [
        {
          name: "Custom",
          field: true,
          placeholder: "Status Text"
        },
        {
          name: "Playing",
          field: true,
          placeholder: "Game Name"
        },
        {
          name: "Watching",
          field: true,
          placeholder: "Movie Name"
        },
        {
          name: "Competing",
          field: true,
          placeholder: "In Game"
        },
        {
          name: "Listening",
          field: true,
          placeholder: "Song"
        },
        {
          name: "Streaming",
          field: true,
          placeholder: "Stream URL"
        },
        {
          name: "None"
        }
      ]
    }
  ],

  subtitle: (values, constants) => {
    if (values.activity == 'Custom') {
      return `${values.activityName}`
    } else {
      return `${values.activity} ${values.activityName}`
    }
  },
  compatibility: ["Any"],

  async run(values, message, client, bridge) {
    const { ActivityTypes } = require('oceanic.js');

    let statuses = {
      Online: "online",
      "Do Not Disturb": "dnd",
      Idle: "idle",
      Invisible: "invisible"
    }

    let activities = {
      Playing: ActivityTypes.GAME,
      Watching: ActivityTypes.WATCHING,
      Competing: ActivityTypes.COMPETING,
      Listening: ActivityTypes.LISTENING,
      Streaming: ActivityTypes.STREAMING,
      Custom: ActivityTypes.CUSTOM
    }

    let status = statuses[values.status]
    let activity = activities[values.activity]
    
    if (values.activity != 'None') {
      client.editStatus(status, [
        {
          name: bridge.transf(values.activityName),
          state: activity == ActivityTypes.CUSTOM ? bridge.transf(values.activityName) : null,
          type: activity
        }
      ])
    } else {
      client.editStatus(status)
    }
  },
};
