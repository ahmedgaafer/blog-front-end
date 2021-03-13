import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import rootReducer from './reducers';
import Nav from './Component/Nav';

import './index.css';
import {
  BrowserRouter as Router
} from 'react-router-dom';


const store = createStore(rootReducer);
//https://colorhunt.co/palette/117601
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Nav />
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);

