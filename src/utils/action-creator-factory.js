
export const payloadActionCreator = (actionType) => data => ({
  type: actionType,
  data
});

export const emptyActionCreator = actionType => () => ({
  type: actionType
});
