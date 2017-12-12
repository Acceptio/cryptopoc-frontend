import { put, call, all } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  DASHBOARD_FULL_PATH
} from '../routes';
import {
  SELLER_USER_TYPE,
  BUYER_USER_TYPE
} from '../utils/constants';
import * as api from '../api/login';
import {
  address as addressActions,
  contract as contractActions,
  abi as abiActions
} from '../actions';
import {
  getAbi,
  getContractDetails
} from './contacts';

export function* loginUser() {
  yield put(
    push(DASHBOARD_FULL_PATH)
  );
}

export function* getOwnAddress(userType) {
  let addressPayload;
  try {
    if (userType === SELLER_USER_TYPE) {
      addressPayload = yield call(api.getSellerAddress);
    } else if (userType === BUYER_USER_TYPE) {
      addressPayload = yield call(api.getBuyerAddress);
    } else {
      throw new Error('Wrong user type');
    }
  } catch (e) {
    throw e;
  }
  return addressPayload.address;
}

export function* enterDashboard({
  data: userType
}) {
  yield put(
    contractActions.resetLoadContractsSuccess()
  );
  const userAddress = yield call(getOwnAddress, userType);
  yield put(
    addressActions.addUserAddress(
      userAddress
    )
  );
  const contractAddresses = yield call(api.getAddresses);
  yield put(
    addressActions.addContractAddresses(
      contractAddresses
    )
  );
  if (contractAddresses.length) {
    const abi = yield call(getAbi);
    yield put(
      abiActions.addContractAbi(
        abi
      )
    );
    const addressStates = yield all(
      contractAddresses.map(
        contractAddress => call(
          getContractDetails,
          contractAddress,
          abi,
          userAddress
        )
      )
    );
    yield put(
      contractActions.addContractsDetails(
        addressStates
      )
    );
  }
  yield put(
    contractActions.loadContractsSuccess()
  );
}
