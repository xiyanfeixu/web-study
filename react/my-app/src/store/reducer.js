const defaultState = {
  val: undefined,
  data: [],
};
export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state));

  if (action.type === "input-change") {
    newState.val = action.value;
    return newState;
  }
  if (action.type === "add") {
    newState.data.push(newState.val);
    newState.val = "";
    return newState;
  }
  if (action.type === "del") {
    newState.data.splice(action.index, 1);
    return newState;
  }
  if (action.type === "init") {
    newState.data = action.value;
    return newState;
  }
  return state;
};
