import logger from "./logger";

export default (
  location: string,
  narrowedEntity: string,
  missedValue: never
): void => {
  logger.fatal(
    `non-exhaustive check in ${location}. ${narrowedEntity} ${missedValue} slipped through`
  );
};

// throw new Error(
//   `non-exhaustive check in ${location}. ${narrowedEntity} ${missedValue} slipped through`
// );
