import React from "react";
import Tab from "../Tab";
import "./styles.css";

const Tabs = () => {
  const tabs = ["users", "posts", "login"];
  return (
    <div className="tabs">
      {tabs.map((tab, index) => (
        <Tab key={tab + index} name={tab} />
      ))}
    </div>
  );
};

export default Tabs;
