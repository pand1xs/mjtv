const { ComponentTypes, ButtonStyles } = require('oceanic.js');

module.exports = {
  category: "Modularity",
  data: { name: "Create Modular Select Menu Option", emojiName: "", emojiID: "", isEmojiAnimated: false, default: false },
  UI: [
    {
      element: "input",
      name: "Label",
      max: 32,
      storeAs: "label"
    },
    {
      element: "input",
      name: "Description",
      max: 64,
      storeAs: "description"
    },
    "_",
    {
      element: "menu",
      max: 1,
      required: true,
      storeAs: "styles_emoji",
      types: {
        styles_emoji: "Styling & Emoji"
      },
      UItypes: {
        styles_emoji: {
          name: "Styling & Emoji",
          inheritData: true,
          UI: [
            {
              element: "inputGroup",
              nameSchemes: ["Emoji Name <span style='opacity: 50%;'>Optional</span>", "Emoji ID <span style='opacity: 50%;'>Optional</span>"],
              storeAs: ["emojiName", "emojiID"],
              placeholder: ["Can Also Be An Emoji", "Required For Custom Emoji"]
            },
            {
              element: "toggle",
              name: "Animate The Emoji",
              storeAs: "isEmojiAnimated"
            },
            "-",
            {
              element: "toggle",
              name: "Make This Option The Default One",
              storeAs: "default"
            },
          ]
        }
      }
    },
    "-",
    {
      element: "input",
      name: "Push To Selection List As",
      storeAs: "pushAs"
    },
    "-",
    {
      name: "If Selected, Run",
      element: "actions",
      storeAs: "actions"
    },
    "-",
    {
      element: "store",
      storeAs: "store"
    }
  ],

  subtitle: (data, constants) => {
    return `Store As: ${constants.variable(data.store)}`
  },

  init: (values, bridge) => {
    bridge.createGlobal({
      class: "modularSelects",
      name: bridge.data.id + "SELECT",
      value: {
        pushValue: values.pushAs,
        actions: values.actions
      }
    })
  },

  run(values, message, client, bridge) {
    let emoji = {
      name: null,
      id: null
    }

    if (values.emojiName.trim() != '') {
      emoji.name = bridge.transf(values.emojiName)

      if (values.emojiID.trim() != '') {
        emoji.id = bridge.transf(values.emojiID)
      }

      emoji.animated = values.isEmojiAnimated
    }

    let result = {
      raw: {
        label: bridge.transf(values.label) || "-",
        emoji: emoji.name == null ? undefined : emoji,
        default: values.default == true,
        description: values.description == undefined || '' ? null : bridge.transf(values.description),
        value: bridge.data.id + "SELECT"
      },
      actions: values.actions,
      pushValue: values.pushAs,
      value: bridge.data.id + "SELECT",
      run: (interaction) => {
        bridge.runner(values.actions);
      }
    };

    bridge.store(values.store, result);
  },
};