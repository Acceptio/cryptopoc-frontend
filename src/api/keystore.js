import lightwallet from 'eth-lightwallet';
import { LOCAL_STORAGE_KEYSTORE_KEY } from '../utils/constants';

const password = 'password';

const serializeAndSaveKeystore = (keystore) => {
  const serialized = keystore.serialize();
  localStorage.setItem(LOCAL_STORAGE_KEYSTORE_KEY, serialized);
};

export const getKeyFromPassword = async (keystore) => {
  return await new Promise((resolve, reject) => {
    keystore.keyFromPassword(password, function(e, pwDerivedKey) {
      if (e) {
        reject(e);
      } else {
        resolve(pwDerivedKey);
      }
    });
  });
};

export const getKeyStore = async () => {
  return await new Promise((resolve, reject) => {
    if (localStorage.getItem(LOCAL_STORAGE_KEYSTORE_KEY) !== null) {
      const serialized = localStorage.getItem(LOCAL_STORAGE_KEYSTORE_KEY);
      resolve(
        lightwallet.keystore.deserialize(serialized)
      );
    } else {
      lightwallet.keystore.createVault({
        password
      }, (err, ks) => {
        if (err) {
          reject(err);
        } else {
          serializeAndSaveKeystore(ks);
          resolve(ks);
        }
      });
    }
  });
};

export const importPrivateKey = async (keystore, key) => {
  const pwDerivedKey = await getKeyFromPassword(keystore);
  keystore.importPrivateKey(key, pwDerivedKey);
  serializeAndSaveKeystore(keystore);
  return keystore.getAddresses();
};

export const signTX = async (
  abi,
  functionName,
  args,
  keystore,
  rawTx,
  userAddress
) => {
  const pwDerivedKey = await getKeyFromPassword(keystore);
  const txHash = lightwallet.txutils.functionTx(
    abi,
    functionName,
    args,
    rawTx
  );
  return lightwallet.signing.signTx(
    keystore,
    pwDerivedKey,
    txHash,
    userAddress
  );
};

const timeOut = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const TIMEOUT = 1000;

const waitForTxToMineByTxHash = async (web3, txHash) => {
  const receipt = await web3.eth.getTransactionReceipt(txHash);
  let toReturn;
  if (receipt === null) {
    await timeOut(TIMEOUT);
    toReturn = await waitForTxToMineByTxHash(web3, txHash);
  } else if (receipt.blockNumber === null) {
    await timeOut(TIMEOUT);
    toReturn = await waitForTxToMineByTxHash(web3, txHash);
  } else {
    toReturn = true;
  }
  return toReturn;
};

export const sendRawTx = async (signed, web3) => {
  const txHash = await new Promise((resolve, reject) => {
    web3.eth.sendRawTransaction(`0x${signed}`, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        console.log(hash);
        resolve(hash);
      }
    });
  });
  return await waitForTxToMineByTxHash(web3, txHash);
};
