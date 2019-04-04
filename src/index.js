import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware,compose,combineReducers } from "redux";
import { Provider, } from "react-redux";
import Reducers from "reducers/";
import App from "./router";
import createSagaMiddleware from "redux-saga";
import saga from "./saga";
import { createHashHistory } from "history";
import { connectRouter,routerMiddleware } from 'connected-react-router'

import "./index.less";

const history = createHashHistory();
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const app = createStore(
  combineReducers({ ...Reducers,router:connectRouter(history) }),
  composeEnhancers(applyMiddleware(sagaMiddleware,routerMiddleware(history))) 
);

sagaMiddleware.run(saga);

ReactDOM.render(
  <Provider store={app}>
    <App history={history} />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
