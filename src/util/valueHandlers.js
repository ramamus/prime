export const extractValues = mappings => {
  return Object.keys(mappings);
};

export const lookupValue = (mappings, key) => {
  return mappings[key];
};

export const lookupKey = (mappings, name) => {
  for (var key in mappings) {
    if (mappings.hasOwnProperty(key)) {
      if (name === mappings[key]) {
        return key;
      }
    }
  }
};
