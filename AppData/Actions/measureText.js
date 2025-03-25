module.exports = {
  data: {
    name: "Measure Text",
    size: "100"
  },
  category: "Images",
  UI: [
    {
      element: "input",
      name: "Text",
      storeAs: "text"
    },
    "-",
    {
      element: "input",
      name: "Size",
      storeAs: "size",
      placeholder: "Number"
    },
    "_",
    {
      element: "menu",
      name: "Custom Font",
      storeAs: "font",
      max: 1,
      types: {
        font: "Custom Font"
      },
      UItypes: {
        font: {
          name: "Custom Font",
          data: { weight: "400" },
          preview: "",
          UI: [
            {
              element: "input",
              name: "TrueType Font File",
              storeAs: "file",
              placeholder: "font.ttf"
            },
            "-",
            {
              element: "input",
              name: "Weight",
              storeAs: "weight",
              placeholder: "Number"
            }
          ]
        }
      }
    },
    "-",
    {
      element: "storage",
      storeAs: "storeX",
      name: "Store Width As"
    },
    "_",
    {
      element: "storage",
      storeAs: "storeY",
      name: "Store Height As"
    }
  ],
  subtitle: (values, constants) => {
    return `${values.text} - Store Width As: ${constants.variable(values.storeX)} - Store Height As: ${constants.variable(values.storeY)}`
  },
  compatibility: ["Any"],
  async run(values, message, client, bridge) {
    let text = bridge.transf(values.text);
    const canvas = require('canvas').createCanvas(values.size * text.length, values.size * text.length);
    const context = canvas.getContext('2d');
    let fontFamily = `${values.size}px Calibri`;
    if (values.font[0]) {
      fontFamily = `${bridge.data.id}font`;
      await registerFont(bridge.file(values.font[0].data.file), {
        family: fontFamily,
        weight: Number(bridge.transf(values.font[0].data.weight))
      });
    }
    let measurement = context.measureText(text);
    bridge.store(values.storeX, Math.floor(measurement.width * 16));
    bridge.store(values.storeY, Math.floor(measurement.emHeightAscent * 16));
  },
};
