import React from "react";
import { useSelector } from "react-redux";

import Login from "./Login";
import Posts from "./Posts";
import Users from "./Users";

const Content = () => {
  const { activeTab } = useSelector((store) => store.tabs);

  const renderContent = (tab) => {
    switch (tab) {
      case "users":
        return <Users />;
        break;
      case "posts":
        return <Posts />;
        break;
      case "login":
        return <Login />;
        break;
      default:
        break;
    }
  };
  return <div className="content">{renderContent(activeTab)}</div>;
};

export default Content;
