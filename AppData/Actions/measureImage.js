module.exports = {
  data: {
    name: "Measure Image",
    size: "100"
  },
  category: "Images",
  UI: [
    {
      element: "image",
      storeAs: "image",
      name: "Image"
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
    return `${constants.image(values.image)} - Store Width As: ${constants.variable(values.storeX)} - Store Height As: ${constants.variable(values.storeY)}`
  },
  compatibility: ["Any"],
  async run(values, message, client, bridge) {
    const jimp = require('jimp').Jimp;
    const image = await jimp.read(await bridge.getImage(values.image));
    bridge.store(values.storeX, Math.floor(image.width));
    bridge.store(values.storeY, Math.floor(image.height));
  },
};
