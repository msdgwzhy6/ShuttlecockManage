/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-4-4
 * Time: 上午9:59
 * Desc:
 */
import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import {rootReducer} from "./reducer";
import {rootSaga} from "./saga";
import {
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

const sagaMiddleware = createSagaMiddleware();
const navMiddleware = createReactNavigationReduxMiddleware(
  "Login",
  state => state.nav,
);

const store = createStore(rootReducer,
  applyMiddleware(sagaMiddleware, logger, navMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;