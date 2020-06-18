import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from "redux-saga";

import { rootReducer, rootSaga } from "./rootDuck";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer(history),
    preloadedState,
    composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
  )

  sagaMiddleware.run(rootSaga);
  return store
}
