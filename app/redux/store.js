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
import {
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

const middleware = []
const enhancers = []

const sagaMiddleware = createSagaMiddleware();
const navMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

middleware.push(sagaMiddleware)
middleware.push(navMiddleware)
middleware.push(logger)

// if (ReduxPersist.active) {
//   enhancers.push(autoRehydrate())
// }

enhancers.push(applyMiddleware(...middleware))

console.log('创建store');

const store = createStore(rootReducer, compose(...enhancers));

sagaMiddleware.run(rootSaga);

export default store;