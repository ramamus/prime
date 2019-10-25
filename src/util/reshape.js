export const toArray = input => Object.values(input);

export const toObject = (input, key = 'id') => {
  return input.reduce((l, r) => ({ ...l, [r[key]]: r }), {});
};
