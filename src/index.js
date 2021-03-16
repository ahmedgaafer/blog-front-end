import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import Nav from "./Component/Nav";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, composedEnhancer);

//https://colorhunt.co/palette/117601
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Nav />
    </Router>
  </Provider>,
  document.getElementById("root")
);
