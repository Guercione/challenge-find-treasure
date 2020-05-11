import createSagaMiddleware from "redux-saga";
import { createStore, combineReducers, applyMiddleware } from "redux";

import Reducers from "./reducers";
import saga from "./saga";

const sagaMiddleware = new createSagaMiddleware();

const Store = createStore(
  combineReducers(Reducers),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(saga);

export default Store;
