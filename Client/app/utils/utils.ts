export const calculatePostTimestamp = function (timestamp: Date) {
  timestamp = new Date(timestamp);
  const millisecondsInMinute = 1000 * 60
  const milliSecondsInHour = millisecondsInMinute * 60;
  const millisecondsInDay = milliSecondsInHour * 24;
  const timeSincePost = Date.now() - timestamp.getTime();

  if (timeSincePost > millisecondsInDay) return Math.floor(timeSincePost / millisecondsInDay) + "d";
  if (timeSincePost > milliSecondsInHour) return Math.floor(timeSincePost / milliSecondsInHour) + "hr";
  const minutes = Math.floor(timeSincePost / millisecondsInMinute);
  return minutes > 1 ? minutes + "mins" : '1min';
}