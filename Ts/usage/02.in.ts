type keys = "name" | "age";
type Obj = {
  [p in keys]: any;
};
