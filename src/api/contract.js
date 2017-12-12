
import {
  abiUrl,
  basicGet,
  deployUrl,
  basicPost
} from './common';

export const getAbi = basicGet(abiUrl);

export const deployContract = basicPost(deployUrl);

export const callOnContract = async (
  instance,
  callMethod,
  transform,
  web3,
  from
) => {
  const response = await new Promise((resolve, reject) => {
    instance[callMethod]({ from }, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
  let toReturn;
  if (typeof transform === 'function') {
    toReturn = transform(web3)(response);
  } else {
    toReturn = response;
  }
  return toReturn;
};
