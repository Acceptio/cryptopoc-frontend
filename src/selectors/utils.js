
export const arrayFromHash = hash => Object.entries(hash)
  .map(
    ([, item]) => item
  );
