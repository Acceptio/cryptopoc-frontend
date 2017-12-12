
export function strip0x(input) {
  let toReturn;
  if (typeof(input) !== 'string') {
    toReturn = input;
  } else if (input.length >= 2 && input.slice(0, 2) === '0x') {
    toReturn = input.slice(2);
  } else {
    toReturn = input;
  }
  return toReturn;
}
