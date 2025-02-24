export const deepSearch = (
  obj: Record<string, any> & { length?: never },
  sensitiveFields: Set<string>
): string[] => {
  const matchingFields: Set<string> = new Set();
  const visited = new WeakSet();

  const search = (obj: Record<string, any>): void => {
    if (visited.has(obj)) return;
    visited.add(obj);
    for (const [key, val] of Object.entries(obj)) {
      if (sensitiveFields.has(key)) {
        matchingFields.add(key);
      } else if (
        typeof val === "object" &&
        val !== null &&
        !Array.isArray(val)
      ) {
        search(val);
      }
    }
  };

  search(obj);
  return Array.from(matchingFields);
};

export default deepSearch;
