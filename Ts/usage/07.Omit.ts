type _Omit<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] };

type Person7 = { name: string; age: number; address: string };
const o7: _Omit<Person7, "age"> = { name: "s", address: "d" };
