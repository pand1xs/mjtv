module.exports = {
  data: {
    name: "Randomize Characters",
  },
  category: "Text",
  UI: [
    { element: "input", storeAs: "length", name: "Length" },
    "-",
    { element: "typedDropdown", storeAs: "lowercase", name: "Lowercase (a-z)", choices: { false: { name: "False" }, true: { name: "True" } } },
    "_",
    { element: "typedDropdown", storeAs: "uppercase", name: "Uppercase (A-Z)", choices: { false: { name: "False" }, true: { name: "True" } } },
    "_",
    { element: "typedDropdown", storeAs: "numeric", name: "Numeric (0-9)", choices: { false: { name: "False" }, true: { name: "True" } } },
    "_",
    { element: "typedDropdown", storeAs: "special", name: "Special (!@#$%^&*()_+)", choices: { false: { name: "False" }, true: { name: "True" } } },
    "_",
    { element: "typedDropdown", storeAs: "custom", name: "Custom characters", choices: { false: { name: "False" }, true: { name: "True", field: true } } },
    "-",
    { element: "storageInput", storeAs: "letters", name: "Store letters as" },
  ],

  subtitle: (values, constants) => {
    const length = values.length || 'Default';
    const selections = [];

    if (values.lowercase.type === 'true') selections.push('Lowercase');
    if (values.uppercase.type === 'true') selections.push('Uppercase');
    if (values.numeric.type === 'true') selections.push('Numeric');
    if (values.special.type === 'true') selections.push('Special');
    if (values.custom.type === 'true' && values.custom.value?.trim()) {
      selections.push(`Custom (${values.custom.value})`);
    }

    const subtitle = `Generate ${length} letter(s) with: ` + (selections.length ? selections.join(', ') : 'No characters selected');
    return values.letters?.value?.trim() ? `${subtitle} - Store As: ${constants.variable(values.letters)}` : subtitle;
  },

  async run(values, client, message, bridge) {
    const charSets = {
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numeric: '0123456789',
      special: '!@#$%^&*()_+',
    };

    let allChars = Object.entries(charSets)
      .filter(([key]) => values[key]?.type === 'true')
      .map(([, chars]) => chars)
      .join('');

    if (values.custom.type === 'true' && values.custom.value?.trim()) {
      allChars += values.custom.value;
    }

    allChars = allChars || Object.values(charSets).join('');
    const length = parseInt(values.length, 10) || 10;
    const result = Array.from({ length }, () => allChars.charAt(Math.floor(Math.random() * allChars.length))).join('');
    
    bridge.store(values.letters, result);
  },
};
