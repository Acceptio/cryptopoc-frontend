
export const selectIsContractChangingStateFromState = state => state.isContractChangingState;

export const selectIsContractStateChangingByAddress = (state, address) => selectIsContractChangingStateFromState(state).includes(address);
