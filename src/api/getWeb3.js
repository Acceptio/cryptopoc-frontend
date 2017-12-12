import Web3 from 'web3';

const getWeb3 = () => {
  let web3 = window.web3;
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider.
    web3 = new Web3(web3.currentProvider);

    console.log('Injected web3 detected.');
  } else {
    // Fallback to localhost if no web3 injection.

    const provider = new Web3.providers.HttpProvider(GETH_BASE_URL);

    web3 = new Web3(provider);
    console.log('Using localhost provider');
  }
  return web3;
};

export default getWeb3;
