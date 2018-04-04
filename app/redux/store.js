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

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

export default store;