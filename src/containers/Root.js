import React from 'react';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

// Layouts
import HomeContainer from '../containers/HomeContainer';
import LoginContainer from '../containers/LoginContainer';
import CreateNewContractContainer from '../containers/CreateNewContractContainer';
import VerifyAddressContainer from 'containers/VerifyAddress';
import NavigationBarWrapper from 'containers/NavigationBarWrapper';

import {
  INDEX_PATH,
  DASHBOARD_FULL_PATH,
  CREATE_NEW_CONTRACT_FULL_PATH,
  VERIFY_ADDRESS_FULL_PATH
} from '../routes';

import { configureStore, history } from '../store/configure-store';
import { keystore as keystoreActions } from 'actions';

const store = configureStore();

export const generateRootComponent = (_store, _history) => {
  const Root = () => (
    <Provider store={ _store }>
      <ConnectedRouter history={ _history }>
        <div>
          <Route
            path={ INDEX_PATH }
            component={ NavigationBarWrapper(LoginContainer) }
            exact
          />
          <Route
            path={ DASHBOARD_FULL_PATH }
            component={ NavigationBarWrapper(HomeContainer) }
            exact
          />
          <Route
            path={ CREATE_NEW_CONTRACT_FULL_PATH }
            component={ NavigationBarWrapper(CreateNewContractContainer) }
            exact
          />
          <Route
            path={ VERIFY_ADDRESS_FULL_PATH }
            component={ NavigationBarWrapper(VerifyAddressContainer) }
            exact
          />
        </div>
      </ConnectedRouter>
    </Provider>
  );
  _store.dispatch(keystoreActions.requestAddKeystore());
  return Root;
};

const RootComponent = generateRootComponent(store, history);

export default RootComponent;
