/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-4-4
 * Time: 上午10:02
 * Desc:
 */
import {takeEvery, put, all} from "redux-saga/effects";
import authorize from "./sagas/authorize";

export const rootSaga = function* sagas() {
  yield all([
    authorize()
  ]);
};
