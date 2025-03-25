module.exports = {
  data: { name: "Convert Text To Emoji" },
  category: "Emoji",
  UI: [
    {
      element: "largeInput",
      name: "Text",
      storeAs: "text",
    },
    "-",
    {
      element: "store",
      storeAs: "store",
    },
  ],

  subtitle: (values, constants) => {
    return `${values.text} - Store As ${constants.variable(values.store)}`
  },

  async run(values, message, client, bridge) {
    let text = bridge.transf(values.text);
    let result = "";

    let numbers = {
      '0': 'zero',
      '1': 'one',
      '2': 'two',
      '3': 'three',
      '4': 'four',
      '5': 'five',
      '6': 'six',
      '7': 'seven',
      '8': 'eight',
      '9': 'nine',
    }

    for (character of text.split("")) {
      if (/[A-Za-z]/.test(character)) {
        result += `:regional_indicator_${character.toLowerCase()}:`
      } else if (/[0-9]/.test(character)) {
        result += `:${numbers[character]}:`
      } else {
        result += character
      }
    }

    bridge.store(values.store, result);
  },
};
