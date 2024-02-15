import { RawUserDocument } from "./types/UserTypes";

// const filterOBJ = <
//   T extends Record<string, any>,
//   keys extends Extract<keyof T, string>
//   // keys extends keyof T
// >(
//   obj: T,
//   include: keys[]
// ) => {
//   type includedFields = typeof include[number];
//   // const returnedObj: Pick<T, includedFields> = Object.fromEntries(
//   //   Object.entries(obj).filter(([key, value]) => include.includes(key))
//   // );
//   const filteredObj = Object.fromEntries(
//     Object.entries(obj).filter(([key, value]) => include.includes(key))
//   ) as Pick<T, includedFields>;
//   return filteredObj;
// };

// const filterOBJ = <T extends {}>(
//   obj: T,
//   include: Extract<keyof T, string>[]
// ) => {
//   type includedFields = typeof include[number];
//   const filteredObj = Object.fromEntries(
//     Object.entries(obj).filter(([key, value]) => include.includes(key as Extract<keyof T, string>))
//   ) as Pick<T, includedFields>;
//   return filteredObj;
// };

export const typeSafeSelect = <
  T extends object,
  fields extends Extract<keyof T, string>
>(
  obj: T,
  include: fields[]
) => {
  const filteredObj = Object.fromEntries(
    Object.entries(obj).filter(([key, value]) =>
      include.includes(key as fields)
    )
  ) as Pick<T, fields>;
  return filteredObj;
};

// const filteredObj = typeSafeSelect<{ hello: string; foo: "bar" }, "hello">(
//   { hello: "world", foo: "bar" },
//   ["hello"]
// );
// filteredObj.hello
const filteredObj = typeSafeSelect({ hello: "world", foo: "bar" }, [
  "foo",
  "hello"
]);
filteredObj;

// filterOBJ.hello;

// type Entry<T> = {
//   [K in keyof T]: [K, T[K]]
// }[keyof T]

// function filterObject<T extends object>(
//   obj: T,
//   fn: (entry: Entry<T>, i: number, arr: Entry<T>[]) => boolean
// ) {
//   return Object.fromEntries(
//     (Object.entries(obj) as Entry<T>[]).filter(fn)
//   ) as Partial<T>
// }
