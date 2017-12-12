import { connect } from 'react-redux';
import VerifyAddressComponent from 'components/VerifyAddress';
import { keystore as keystoreActions } from 'actions';
import { selectTemporaryPrivateKeyFromState } from 'selectors/temporary-key';
import { selectIsTemporaryKeyValidFromState } from 'selectors/is-temporary-key-valid';
import { selectUserAddressFromState } from '../selectors/user';
import { selectKeyStoreFromState } from 'selectors/keystore';

const mapStateToProps = state => ({
  privateKey: selectTemporaryPrivateKeyFromState(state),
  isTemporaryKeyValid: selectIsTemporaryKeyValidFromState(state),
  address: selectUserAddressFromState(state),
  keystore: selectKeyStoreFromState(state)
});

const mapDispatchToProps = dispatch => ({
  setNewPrivateKey: (key) => dispatch(
    keystoreActions.setNewTemporaryPrivateKey(
      key
    )
  ),
  verifyPrivateKey: ({
    address,
    keystore,
    key
  }) => () => dispatch(keystoreActions.verifyPrivateKey({
    key,
    address,
    keystore
  }))
});

const mergedProps = ({
  privateKey,
  isTemporaryKeyValid,
  address,
  keystore
}, {
  setNewPrivateKey,
  verifyPrivateKey
}) => ({
  privateKey,
  isTemporaryKeyValid,
  address,
  setNewPrivateKey,
  verifyPrivateKey: verifyPrivateKey({
    keystore,
    address,
    key: privateKey
  })
});

const VerifyAddressContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergedProps
)(VerifyAddressComponent);

export default VerifyAddressContainer;
