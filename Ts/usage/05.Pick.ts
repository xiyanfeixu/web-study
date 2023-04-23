type _Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Person5 = { name: string; age: number };
const o5: _Pick<Person5, "name"> = { name: "2" };
