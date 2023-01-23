import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./App.css";
import { increment } from "./features/counter/counterSlice";
import Tabs from "./components/Tabs";
import Content from "./components/Content";

const App = () => {
  return (
    <div className="App">
      <Tabs />
      <Content />
    </div>
  );
};

export default App;
