export const NOTIFICATION_RECEIVED = 'NOTIFICATION_RECEIVED';
export const notificationReceived = notification => ({
  type: NOTIFICATION_RECEIVED,
  payload: {
    notification,
  },
});

export const NOTIFICATION_READ = 'NOTIFICATION_READ';
export const notificationRead = notificationId => ({
  type: NOTIFICATION_READ,
  payload: {
    notificationId,
  },
});

export const NOTIFICATION_REMOVE_FROM_STACK = 'NOTIFICATION_REMOVE_FROM_STACK';
export const notificationRemoveFromStack = notificationId => ({
  type: NOTIFICATION_REMOVE_FROM_STACK,
  payload: {
    notificationId,
  },
});
