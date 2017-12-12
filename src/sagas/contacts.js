import * as api from '../api/contract';
import * as keystoreApi from 'api/keystore';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { CONTRACT_STATES_MAP } from 'utils/contract-states-config';
import { DASHBOARD_FULL_PATH } from 'routes';
import getWeb3 from 'api/getWeb3';
import {
  contract as contractActions,
  contractState as contractStateActions
} from '../actions';

export function* getAbi() {
  let abi;
  try {
    abi = yield call(api.getAbi);
  } catch (e) {
    throw e;
  }
  return abi;
}

const contractDetailsTransform = web3 => ([
  startDate,
  endDate,
  seller,
  buyer,
  terms,
  contractState,
  isActivationMessageSent,
  canceledRequest
]) => {
  const idx = web3.toDecimal(contractState);
  const startDateParsed = new Date(web3.toDecimal(startDate) * 1000);
  const endDateParsed = new Date(web3.toDecimal(endDate) * 1000);
  const termsParsed = web3.toUtf8(terms);
  const parsedContractState = CONTRACT_STATES_MAP.find(config => config.value === idx).name;
  return {
    startDate: startDateParsed,
    endDate: endDateParsed,
    seller,
    buyer,
    terms: termsParsed,
    contractState: parsedContractState,
    isActivationMessageSent,
    canceledRequest
  };
};

export function* getContractDetails(
  address,
  abi,
  userAddress
) {
  const web3 = getWeb3();
  const contract = web3.eth.contract(abi);
  const instance = contract.at(address);
  const details = yield call(
    api.callOnContract,
    instance,
    'getContractDetails',
    contractDetailsTransform,
    web3,
    userAddress
  );
  return {
    address,
    details
  };
}

export function* deployNewContract({
  data: {
    startDate,
    endDate,
    terms
  }
}) {
  const startDateParsed = startDate.toISOString();
  const endDateParsed = endDate.toISOString();
  yield call(api.deployContract, {
    startDate: startDateParsed,
    endDate: endDateParsed,
    terms
  });
  yield put(
    push(
      DASHBOARD_FULL_PATH
    )
  );
}

function* generateContractTX({
  address,
  abi,
  userAddress,
  keystore,
  fname,
  args = []
}) {
  const web3 = getWeb3();
  const nonce = web3.eth.getTransactionCount(userAddress);
  const nonceHex = web3.toHex(nonce);
  const gasPrice = web3.toHex(200000);
  const gasLimit = web3.toHex(50000);
  const rawTx = {
    gasPrice,
    gasLimit,
    value: '0x00',
    to: address,
    nonce: nonceHex
  };
  const signed = yield call(
    keystoreApi.signTX,
    abi,
    fname,
    args,
    keystore,
    rawTx,
    userAddress
  );
  yield put(
    contractStateActions.contractStateChangeStart(
      address
    )
  );
  yield call(
    keystoreApi.sendRawTx,
    signed,
    web3
  );
  const addressState = yield call(getContractDetails,
    address,
    abi,
    userAddress
  );
  yield put(
    contractStateActions.contractStateChangeStop(
      address
    )
  );
  yield put(
    contractActions.addContractsDetails(
      [addressState]
    )
  );
}

export function* activateContract({
  data
}) {
  yield call(generateContractTX, {
    ...data,
    fname: 'activate'
  });
}

export function* cancelContract({
  data
}) {
  yield call(generateContractTX, {
    ...data,
    fname: 'cancel'
  });
}

export function* reviewContract({
  data
}) {
  yield call(generateContractTX, {
    ...data,
    fname: 'review'
  });
}

export function* resolveReviewContract({
  data
}) {
  yield call(generateContractTX, {
    ...data,
    fname: 'resolveReview',
    args: [data.decision]
  });
}

export function* resolvePendingContract({
  data
}) {
  yield call(generateContractTX, {
    ...data,
    fname: 'resolvePending',
    args: [data.decision]
  });
}
