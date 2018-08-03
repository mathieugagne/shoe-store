export const CONNECTION_STATUS_CHANGED = 'CONNECTION_STATUS_CHANGED';
export const connectionChangeAction = newStatus => ({
  type: CONNECTION_STATUS_CHANGED,
  payload: newStatus,
});

export const NEW_DATA_RECEIVED = 'NEW_DATA_RECEIVED';
export const newDataReceivedAction = newData => ({
  type: NEW_DATA_RECEIVED,
  payload: newData,
});

export const GLOBAL_MESSAGE_CHANGE = 'GLOBAL_MESSAGE_CHANGE';
export const globalMessageAction = newGlobalMsg => ({
  type: GLOBAL_MESSAGE_CHANGE,
  payload: newGlobalMsg,
});
