import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux"; //Provider is going to keep track of that store, which is global state and that allows us to access that store from anywhere inside of the app. We don't have to be exactly in a parent component or in a child component

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import App from "./App";
import "./index.css";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
