import React, {Component} from "react";
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import App from "./components/App.jsx";
import "./sass/index.sass";

ReactDOM.render(
  <HashRouter>
    <App/>
  </HashRouter>,
  root
);