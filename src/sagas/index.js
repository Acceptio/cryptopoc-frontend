import * as types from '../actions/types';
import { takeEvery } from 'redux-saga/effects';
import {
  loginUser,
  enterDashboard
} from './login';
import {
  deployNewContract,
  activateContract,
  cancelContract,
  reviewContract,
  resolveReviewContract,
  resolvePendingContract
} from './contacts';
import {
  getKeystore,
  verifyPrivateKey
} from './keystore';

export default function* root() {
  yield takeEvery(types.SELLER_LOGIN, loginUser);
  yield takeEvery(types.BUYER_LOGIN, loginUser);
  yield takeEvery(types.ENTER_DASHBOARD, enterDashboard);
  yield takeEvery(types.DEPLOY_NEW_CONTRACT, deployNewContract);
  yield takeEvery(types.REQUEST_ADD_KEYSTORE, getKeystore);
  yield takeEvery(types.VERIFY_TEMPORARY_PRIVATE_KEY, verifyPrivateKey);
  yield takeEvery(types.ACTIVATE_CONTRACT, activateContract);
  yield takeEvery(types.CANCEL_CONTRACT, cancelContract);
  yield takeEvery(types.REVIEW_CONTRACT, reviewContract);
  yield takeEvery(types.RESOLVE_REVIEW_CONTRACT, resolveReviewContract);
  yield takeEvery(types.RESOLVE_PENDING_CONTRACT, resolvePendingContract);
}
