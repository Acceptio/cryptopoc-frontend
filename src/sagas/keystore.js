import { call, put } from 'redux-saga/effects';
import * as api from 'api/keystore';
import { keystore as keystoreActions } from 'actions';
import { push } from 'react-router-redux';
import {
  DASHBOARD_FULL_PATH
} from 'routes';
import { strip0x } from 'utils/strip-ox';

export function* getKeystore() {
  const keystore = yield call(api.getKeyStore);
  yield put(
    keystoreActions.addKeystore(
      keystore
    )
  );
}

export function* verifyPrivateKey({
  data: {
    key,
    address,
    keystore
  }
}) {
  yield put(
    keystoreActions.resetTemporaryPrivateKey()
  );
  const addresses = yield call(api.importPrivateKey, keystore, strip0x(key));
  if (addresses.includes(strip0x(address))) {
    yield put(
      push(
        DASHBOARD_FULL_PATH
      )
    );
  } else {
    yield put(keystoreActions.keyVerificationFailed());
  }
}
