type _Required<T> = { [P in keyof T]-?: T[P] };
type Person4 = { name?: string; age?: number };
const o: _Required<Person4> = { name: "xz", age: 2 };
