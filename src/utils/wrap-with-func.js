
const wrapWithFunc = funcRef => obj => Object.entries(obj)
  .reduce((acc, [name, func]) => (
    {
      ...acc,
      [name]: function() {
        return funcRef(func(...arguments));
      }
    }
  ), {});

export default wrapWithFunc;
