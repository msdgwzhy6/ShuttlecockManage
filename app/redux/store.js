/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-4-4
 * Time: 上午9:59
 * Desc:
 */
import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import {rootReducer} from "./reducer";
import {rootSaga} from "./saga";
import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import ReduxPersist from "../config/ReduxPersist"; // defaults to localStorage for web and AsyncStorage for react-native

const middleware = []

const sagaMiddleware = createSagaMiddleware();
const navMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

middleware.push(sagaMiddleware)
middleware.push(navMiddleware)
middleware.push(logger)

let store = createStore(rootReducer, applyMiddleware(...middleware))

//store 持久化
if (ReduxPersist.active) {
  const persistConfig = {
    key: 'root',
    storage
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  store = createStore(persistedReducer, applyMiddleware(...middleware))
  sagaMiddleware.run(rootSaga);

  persistStore(store)
} else {
    sagaMiddleware.run(rootSaga);
}

export default store