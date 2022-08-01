export const calculatePostTimestamp = function (timestamp: Date) {
  // const suffixGenerator = function (val: number) {
  //   return val > 1 ? "s" : "";
  // }

  timestamp = new Date(timestamp);
  const milliSecondsInHour = (1000*60*60);
  const millisecondsInDay = milliSecondsInHour * 24;
  const timeSincePost = Date.now() - timestamp.getTime();

  if (timeSincePost > millisecondsInDay) return Math.floor(timeSincePost / millisecondsInDay) + "d";
  else return Math.floor(timeSincePost / milliSecondsInHour) + "hr";
}