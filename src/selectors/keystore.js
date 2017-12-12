import { selectUserAddressFromState } from './user';
import { strip0x } from '../utils/strip-ox';

export const selectKeyStoreFromState = state => state.keystore;

export const selectKeyStoreAddresses = state => selectKeyStoreFromState(state).getAddresses();

export const selectKeyStoreHasUserAddress = state => {
  const address = selectUserAddressFromState(state);
  return selectKeyStoreAddresses(state).includes(
    strip0x(
      address
    )
  );
};
