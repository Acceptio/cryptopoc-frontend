
const selectNewContractFromState = state => state.newContract;

export const selectNewContractStartDateFromState = state => selectNewContractFromState(state).startDate;

export const selectNewContractEndDateFromState = state => selectNewContractFromState(state).endDate;

export const selectNewContractTermsFromState = state => selectNewContractFromState(state).terms;
