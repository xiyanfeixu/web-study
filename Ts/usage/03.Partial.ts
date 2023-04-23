type _Partial<T> = { [P in keyof T]?: T[P] };

type Person = { name: string; age: number };
const obj3: _Partial<Person> = { name: "jk" };
