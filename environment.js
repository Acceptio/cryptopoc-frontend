
const strF = function(value) {
  return JSON.stringify(value);
};

const secretsOrExtWithDefault = (def) => (propName) => strF(process.env[propName]) || strF(def) || strF('');

const props = {
  GETH_BASE_URL: secretsOrExtWithDefault('http://localhost:8545'),
  API_BASE_URL: secretsOrExtWithDefault('http://localhost:9011/')
};

const wrapWithPropNames = obj => Object.keys(obj)
  .reduce(
    (
      acc,
      key
    ) => typeof obj[key] === 'function'
      ? Object.assign({}, acc, { [key]: obj[key](key) })
      : Object.assign({}, acc, { [key]: obj[key] }),
    {}
  );

module.exports = wrapWithPropNames(props);
