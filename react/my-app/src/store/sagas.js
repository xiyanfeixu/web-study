import { takeEvery, put } from "redux-saga/effects";
const getData = () => Promise.resolve(["jk", "suga", "jimin"]);

function* fetchData() {
  const re = yield getData();

  yield put({ type: "init", value: re });
}
function* mySaga() {
  yield takeEvery("init-saga", fetchData);
}
export default mySaga;
