
const generateBoolReducer = (
  toTrueActionType,
  toFalseActionType,
  initialState = false
) => (
  state = initialState,
  action
) => {
  switch (action.type) {
    case toTrueActionType:
      return true;
    case toFalseActionType:
      return false;
    default:
      return state;
  }
};

export default generateBoolReducer;
