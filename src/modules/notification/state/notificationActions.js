export const NOTIFICATION_RECEIVED = 'NOTIFICATION_RECEIVED';
export const notificationReceived = (
  id,
  type,
  title,
  content,
  isRead,
  createdAt,
) => ({
  type: NOTIFICATION_RECEIVED,
  payload: {
    id,
    type,
    title,
    content,
    isRead,
    createdAt,
  },
});
