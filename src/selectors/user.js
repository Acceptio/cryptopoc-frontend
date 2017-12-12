
export const selectUserFromState = state => state.user;

export const selectUserTypeFromState = state => selectUserFromState(state).userType;

export const selectUserAddressFromState = state => selectUserFromState(state).address;
