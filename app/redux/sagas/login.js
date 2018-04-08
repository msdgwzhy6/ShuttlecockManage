/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-4-4
 * Time: 下午4:56
 * Desc: authorize saga
 */
import {takeLatest, put} from "redux-saga/effects";
import AV from "leancloud-storage";
import {LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS} from "../reducers/login";

function* LOGIN_REQUEST_HANDLE({payload: {username, password}}) {
  try {
    const user = yield AV.User.logIn(username, password);
    yield put(LOGIN_SUCCESS(user));
  } catch ({code, rawMessage}) {
    yield put(LOGIN_FAIL(rawMessage));
  }
};

export default function* login() {
  yield takeLatest(LOGIN_REQUEST, LOGIN_REQUEST_HANDLE)
};