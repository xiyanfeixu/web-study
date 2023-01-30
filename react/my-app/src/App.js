import "./App.css";
import { Button, Input, List, Space } from "antd";
import { useEffect, useState } from "react";
import store from "./store";


function App() {
  const [storeData, setStoreData] = useState(store.getState() || {});
  const { val, data } = storeData;
  useEffect(() => {
    store.subscribe(() => {
      setStoreData(store.getState());
    });
  }, []);
  const add = () => {
    const action = { type: "add" };
    store.dispatch(action);
  };
  const del = (idx) => {
    const action = { type: "del", index: idx };
    store.dispatch(action);
  };
  const change = (e) => {
    const val = e.target.value;
    const action = {
      type: "input-change",
      value: val,
    };
    store.dispatch(action);
  };

  useEffect(() => {
    const action = { type: "init-saga" };
    store.dispatch(action);
  }, []);
  return (
    <div className="App">
      <div>
        <Space>
          <Input value={val} onChange={change} />
          <Button type="primary" onClick={add}>
            提交
          </Button>
        </Space>
      </div>
      <List
        dataSource={data}
        renderItem={(item, idx) => (
          <List.Item
            key={item}
            onClick={() => {
              del(idx);
            }}
          >
            {item}
          </List.Item>
        )}
        bordered
      />
    </div>
  );
}

export default App;
