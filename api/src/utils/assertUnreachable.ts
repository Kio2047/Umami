export default (
  location: string,
  narrowedEntity: string,
  missedValue: never
): never => {
  throw new Error(
    `non-exhaustive check in ${location}. ${narrowedEntity} ${missedValue} slipped through`
  );
};
