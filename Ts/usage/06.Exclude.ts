type _Exclude<T, P> = T extends P ? never : T;
type Person6 = { name: string; age: number; address: string };
const o6: _Exclude<keyof Person6, "age"> = "name";
