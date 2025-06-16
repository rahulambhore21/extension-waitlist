export const getTimerEndDate = () => {
  const now = new Date();
  return new Date(now.getTime() + (60 * 60 * 60 * 1000)); // 60 hours in milliseconds
};