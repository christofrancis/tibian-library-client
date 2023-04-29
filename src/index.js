import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./Routes";
import TagManager from "react-gtm-module";

const TagManagerArgs = {
  //gtm container id
  gtmId: "G-WLNJPPMVR2",
};

TagManager.initialize(TagManagerArgs);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);
