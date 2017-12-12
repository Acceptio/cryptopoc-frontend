import * as types from './types';

export const loginSeller = () => ({
  type: types.SELLER_LOGIN
});

export const loginBuyer = () => ({
  type: types.BUYER_LOGIN
});

export const onDashboardEnter = data => ({
  type: types.ENTER_DASHBOARD,
  data
});
