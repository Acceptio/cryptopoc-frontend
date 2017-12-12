import * as types from './types';
import {
  payloadActionCreator,
  emptyActionCreator
} from 'utils/action-creator-factory';

export const addKeystore = payloadActionCreator(
  types.ADD_KEYSTORE
);

export const requestAddKeystore = emptyActionCreator(
  types.REQUEST_ADD_KEYSTORE
);

export const setNewTemporaryPrivateKey = payloadActionCreator(
  types.SET_TEMPORARY_PRIVATE_KEY
);

export const verifyPrivateKey = payloadActionCreator(
  types.VERIFY_TEMPORARY_PRIVATE_KEY
);

export const resetTemporaryPrivateKey = emptyActionCreator(
  types.RESET_TEMPORARY_PRIVATE_KEY
);

export const keyVerificationFailed = emptyActionCreator(
  types.KEY_VERIFICATION_FAILED
);
